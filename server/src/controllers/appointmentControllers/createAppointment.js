const { Op } = require("sequelize");

const {
  Appointment,
  TattooArtist,
  Customer,
  TimeAvailability,
  TimeAvailabilityException,
  PriceRange,
} = require("../../db");

const sizesAndDurations = {
  Pequeño: 1,
  "Pequeño a color": 1,
  Mediano: 2,
  "Mediano a color": 2,
  Grande: 3,
  "Grande a color": 3,
};

const daysOfWeekNames = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const createAppointment = async ({
  tattooArtistId,
  customerId,
  size,
  image,
  bodyPlace,
  description,
  dateAndTime,
}) => {
  //chequea que exista el tatuador
  const tattooArtist = await TattooArtist.findByPk(tattooArtistId);
  if (tattooArtist === null) {
    return { code: 404, error: "Artista no encontrado" };
  }

  //chequea que exista el cliente
  const customer = await Customer.findByPk(customerId);
  if (customer === null) {
    return { code: 404, error: "Cliente no encontrado" };
  }

  //chequea que el cliente no tenga un turno ese día
  let dateToCompare = dateAndTime.split("T");
  let appointmentCustomer = await Appointment.findAll({
    where: {
      Customer_Appointment: customerId,
      dateAndTime: {
        [Op.between]: [
          new Date(dateToCompare[0] + "T00:00:00.000Z"),
          new Date(dateToCompare[0] + "T23:59:59.999Z"),
        ],
      },
      paymentStatus: { [Op.or]: ["approved", "in_process"] },
      disabled: false,
    },
  });

  //si existe no le deja pedir otro turno
  if (appointmentCustomer.length) {
    return {
      code: 404,
      error: "No podés sacar dos turnos para el mismo día",
    };
  }

  //busca los turnos existentes para esa fecha, con estado de pago aprobado o pendiente
  let appointmentsExist = await Appointment.findAll({
    where: {
      TattooArtist_Appointment: tattooArtistId,
      dateAndTime: {
        [Op.between]: [
          new Date(dateToCompare[0] + "T00:00:00.000Z"),
          new Date(dateToCompare[0] + "T23:59:59.999Z"),
        ],
      },
      paymentStatus: { [Op.or]: ["approved", "in_process"] },
      disabled: false,
    },
  });

  //si existen, chequea que no coincida algún turno existente con el que se intenta crear
  if (appointmentsExist.length) {
    const dateOrTime = dateAndTime.split("T");
    const hourSplit = Number(dateOrTime[1].split(":")[0]);
    for (let i = 0; i < appointmentsExist.length; i++) {
      let existDateOrTime = appointmentsExist[i].dateAndTime
        .toISOString()
        .split("T");
      let existHourSplit = Number(existDateOrTime[1].split(":")[0]);
      if (
        hourSplit < existHourSplit + appointmentsExist[i].duration &&
        hourSplit + sizesAndDurations[size] > existHourSplit
      ) {
        return {
          code: 404,
          error: "El artista ya tiene un turno agendado para ese horario",
        };
      }
    }
  }

  //cálculo del día de la semana:
  const date = new Date(dateAndTime);
  const exactDate = date.toISOString();
  const dayOfWeek = date.getDay();
  const dayName = daysOfWeekNames[dayOfWeek];

  //busca dentro de timeAvailability si ese día de la semana ese tatuador trabaja
  const possibleAvialability = await TimeAvailability.findOne({
    where: { TattooArtistId: tattooArtistId, day: dayName },
  });
  //si no tiene disponibilidad horaria cargada ese día dice que ese día no está disponible
  if (possibleAvialability === null) {
    return { code: 404, error: "El artista no trabaja ese día" };
  }
  // si existe disponibilidad horaria, se queda con los horarios cargados para ese día
  let initialHour = possibleAvialability.initialHour;
  let finalHour = possibleAvialability.finalHour;
  let secondInitialHour = possibleAvialability.secondInitialHour;
  let secondFinalHour = possibleAvialability.secondFinalHour;

  //cálculo fecha
  const dateOrTime = exactDate.split("T");
  //busca dentro de timeAvailabilityException si esa fecha ese tatuador tiene una excepcion cargada
  const possibleException = await TimeAvailabilityException.findOne({
    where: { TattooArtistId: tattooArtistId, date: dateOrTime[0] },
  });
  //si hay una excepcion y el horario es nulo significa que esa fecha no trabaja
  if (possibleException && possibleException.initialHour === null) {
    return {
      code: 400,
      error: "El artista no trabaja esa fecha o trabaja en un horario especial",
    };
  }
  //si esa fecha sí trabaja, se queda con los horarios cargados para ese día
  if (possibleException && possibleException.initialHour !== null) {
    initialHour = possibleException.initialHour;
    finalHour = possibleException.finalHour;
    secondInitialHour = possibleException.secondInitialHour;
    secondFinalHour = possibleException.secondFinalHour;
  }

  //comparar las horas
  //caso la hora del turno sea antes de la hora que el tatuador empieza, error
  if (
    Number(dateOrTime[1].split(":")[0]) <
    Number(initialHour.split(":")[0]) + 3
  ) {
    return {
      code: 400,
      error: "El artista empieza a trabajar más tarde",
    };
  }
  // caso la hora del turno sea entre las horas que el tatuador trabaja, error
  if (secondInitialHour !== null && secondFinalHour !== null) {
    if (
      Number(dateOrTime[1].split(":")[0]) >
        Number(finalHour.split(":")[0]) + 3 &&
      Number(dateOrTime[1].split(":")[0]) <
        Number(secondInitialHour.split(":")[0]) + 3
    ) {
      return {
        code: 400,
        error: "El artista no trabaja durante esa hora",
      };
    }
    //caso la hora del turno sea después de la hora que el tatuador termina, error
    if (
      Number(dateOrTime[1].split(":")[0]) >
      Number(secondFinalHour.split(":")[0]) + 3
    ) {
      return {
        code: 400,
        error: "El artista termina de trabajar más temprano",
      };
    }
  }
  //caso la hora del turno sea después de la hora que el tatuador termina, error
  if (secondInitialHour === null) {
    if (
      Number(dateOrTime[1].split(":")[0]) >
      Number(finalHour.split(":")[0]) + 3
    ) {
      return {
        code: 400,
        error: "El artista termina de trabajar más temprano",
      };
    }
  }

  //caso la hora elegida para el turno + la duración calculada supere la hora laboral final, error
  const hourSplit = Number(dateOrTime[1].split(":")[0]);
  const finalHourSplit = Number(finalHour.split(":")[0]);

  if (secondInitialHour !== null && secondFinalHour !== null) {
    const secondInitialHourSplit = Number(secondInitialHour.split(":")[0]);
    const secondFinalHourSplit = Number(secondFinalHour.split(":")[0]);
    if (hourSplit > secondInitialHourSplit + 3) {
      if (hourSplit + sizesAndDurations[size] > secondFinalHourSplit + 3) {
        return { code: 400, error: "El turno debe comenzar antes" };
      }
    }
    if (hourSplit < finalHourSplit + 3) {
      if (hourSplit + sizesAndDurations[size] > finalHourSplit + 3) {
        return { code: 400, error: "El turno debe comenzar antes" };
      }
    }
  } else if (secondInitialHour === null) {
    if (hourSplit + sizesAndDurations[size] > finalHourSplit + 3) {
      return { code: 400, error: "El turno debe comenzar antes" };
    }
  }

  //caso la hora elegida para el turno + la duración calculada esté dentro del rango laboral, se crea el turno
  if (
    hourSplit + sizesAndDurations[size] <= finalHourSplit + 3 ||
    (secondFinalHour &&
      hourSplit + sizesAndDurations[size] <=
        Number(secondFinalHour.split(":")[0]) + 3)
  ) {
    //cálculo del valor de la seña
    const priceRangeFound = await PriceRange.findOne({
      where: { TattooArtistId: tattooArtistId, size: size },
    });
    if (!priceRangeFound) {
      return {
        code: 404,
        error: "El rango de precios para ese tamaño no está disponible",
      };
    }
    const depositAmount = priceRangeFound.priceMin / 2;

    try {
      const appointment = await Appointment.create({
        size,
        image,
        bodyPlace,
        description,
        dateAndTime,
        duration: sizesAndDurations[size],
        depositPrice: depositAmount,
        Customer_Appointment: customerId,
        TattooArtist_Appointment: tattooArtistId,
      });
      return {
        code: 201,
        message: "Turno creado exitosamente",
        data: appointment,
      };
    } catch (error) {
      return { code: 400, error: error.message };
    }
  }
};

module.exports = createAppointment;
