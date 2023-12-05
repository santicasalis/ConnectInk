const {
  Appointment,
  TattooArtist,
  Customer,
  CustomerTattooArtistAppointment,
  TimeAvailability,
  TimeAvailabilityException,
} = require("../../db");

const sizesAndDurations = {
  pequeño: 1,
  "pequeño a color": 1,
  mediano: 2,
  "mediano a color": 2,
  grande: 3,
  "grande a color": 3,
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
    return { code: 404, error: "Day not available" };
  }
  // si existe disponibilidad horaria, se queda con los horarios cargados para ese día
  let initialHour = possibleAvialability.initialHour;
  let finalHour = possibleAvialability.finalHour;

  //cálculo fecha
  const dateOrTime = exactDate.split("T");

  //busca dentro de timeAvailabilityException si esa fecha ese tatuador tiene una excepcion cargada
  const possibleException = await TimeAvailabilityException.findOne({
    where: { TattooArtistId: tattooArtistId, date: dateOrTime[0] },
  });
  //si hay una excepcion y el horario es nulo significa que esa fecha no trabaja
  if (possibleException && possibleException.initialHour === null) {
    return { code: 400, error: "The tattoo artist doesn't work that day" };
  }
  //si esa fecha sí trabaja, se queda con los horarios cargados para ese día
  if (possibleException && possibleException.initialHour !== null) {
    initialHour = possibleException.initialHour;
    finalHour = possibleException.finalHour;
  }

  //comparar las horas
  //caso la hora laboral inicial sea mayor a la hora elegida para el turno, error
  if (initialHour > dateOrTime[1]) {
    return { code: 400, error: "The tattoo artist starts working later" };
  }
  //caso la hora laboral final sea menor a la hora elegida para el turno, error
  if (finalHour < dateOrTime[1]) {
    return { code: 400, error: "The tattoo artist finishes work early" };
  }

  //caso la hora elegida para el turno + la duración calculada supere la hora laboral final, error
  const hourSlice = Number(dateOrTime[1].slice(0, 2));
  const finalHourDate = new Date(`${dateOrTime[0]}T${finalHour}`);
  if (hourSlice + sizesAndDurations[size] > finalHourDate.getHours()) {
    return { code: 400, error: "The appointment must start earlier" };
  }
  //caso la hora elegida para el turno + la duración calculada esté dentro del rango laboral, se crea el turno
  console.log(hourSlice, sizesAndDurations[size], finalHourDate.getHours)
  if (hourSlice + sizesAndDurations[size] <= finalHourDate.getHours()) {
    try {
      const appointment = await Appointment.create({
        size,
        image,
        bodyPlace,
        description,
        dateAndTime,
        duration: sizesAndDurations[size],
        depositPrice: 1,
        CustomerId: customerId,
        TattooArtistId: tattooArtistId
      });
      //se crean las relaciones en la tabla de unión
      // try {
      //   await CustomerTattooArtistAppointment.create({
      //     CustomerId: customer.id,
      //     TattooArtistId: tattooArtist.id,
      //     AppointmentId: appointment.id,
      //   });
      //   return {
      //     code: 201,
      //     message: "Appointment created successfully",
      //     data: appointment,
      //   };
      // } catch (error) {
      //   return { code: 400, error: "Something went wrong" };
      // }
    } catch (error) {
      return { code: 400, error: "Something went wrong" };
    }
  }
};

module.exports = createAppointment;
