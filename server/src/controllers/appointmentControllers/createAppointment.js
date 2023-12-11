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
    return { code: 404, error: "Tattoo artist not found" };
  }

  //chequea que exista el cliente
  const customer = await Customer.findByPk(customerId);
  if (customer === null) {
    return { code: 404, error: "Customer not found" };
  }

  //busca los turnos existentes para esa fecha, con estado de pago aprobado o pendiente
  let dateToCompare = dateAndTime.split("T");
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
    },
  });

  //si existen, chequea que no coincida algún turno existente con el que se intenta crear
  if (appointmentsExist !== null) {
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
          error:
            "The tattoo artist already has an appointment scheduled at that time",
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
    return { code: 404, error: "The tattoo artist doesn't work that day" };
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
      error:
        "The tattoo artist doesn't work that date or has a special schedule",
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
      error: "The tattoo artist starts working later",
    };
  }
  // caso la hora del turno sea entre las horas que el tatuador trabaja, error
  if (secondInitialHour !== null) {
    if (
      Number(dateOrTime[1].split(":")[0]) >
        Number(finalHour.split(":")[0]) + 3 &&
      Number(dateOrTime[1].split(":")[0]) <
        Number(secondInitialHour.split(":")[0]) + 3
    ) {
      return {
        code: 400,
        error: "The tattoo artist doesn't work during that hour",
      };
    }
    //caso la hora del turno sea después de la hora que el tatuador termina, error
    if (
      Number(dateOrTime[1].split(":")[0]) >
      Number(secondFinalHour.split(":")[0]) + 3
    ) {
      return {
        code: 400,
        error: "The tattoo artist finishes work early",
      };
    }
  }
  //caso la hora del turno sea después de la hora que el tatuador termina, error
  console.log("1", Number(dateOrTime[1].split(":")[0]));
  console.log("2", Number(finalHour.split(":")[0]) + 3);
  if (secondInitialHour === null) {
    if (
      Number(dateOrTime[1].split(":")[0]) >
      Number(finalHour.split(":")[0]) + 3
    ) {
      return {
        code: 400,
        error: "The tattoo artist finishes work early",
      };
    }
  }

  //caso la hora elegida para el turno + la duración calculada supere la hora laboral final, error
  const hourSplit = Number(dateOrTime[1].split(":")[0]);
  const finalHourSplit = Number(finalHour.split(":")[0]);

  if (secondInitialHour !== null) {
    const secondInitialHourSplit = Number(secondInitialHour.split(":")[0]);
    const secondFinalHourSplit = Number(secondFinalHour.split(":")[0]);
    if (hourSplit > secondInitialHourSplit + 3) {
      if (hourSplit + sizesAndDurations[size] > secondFinalHourSplit + 3) {
        return { code: 400, error: "1 The appointment must start earlier" };
      }
    }
    if (hourSplit < finalHourSplit + 3) {
      if (hourSplit + sizesAndDurations[size] > finalHourSplit + 3) {
        return { code: 400, error: "2 The appointment must start earlier" };
      }
    }
  } else if (secondInitialHour === null) {
    if (hourSplit + sizesAndDurations[size] > finalHourSplit + 3) {
      console.log(
        "Hora split ",
        hourSplit,
        "size ",
        sizesAndDurations[size],
        "final hour ",
        finalHourSplit + 3
      );
      return { code: 400, error: "3 The appointment must start earlier" };
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
        error: "Price range not found, the deposit price cannot be calculated",
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
        message: "Appointment created successfully",
        data: appointment,
      };
    } catch (error) {
      return { code: 400, error: error.message };
    }
  }
};

module.exports = createAppointment;
