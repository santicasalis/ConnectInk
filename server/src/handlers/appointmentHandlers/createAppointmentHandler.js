const createAppointment = require("../../controllers/appointmentControllers/createAppointment");

const createAppointmentHandler = async (req, res) => {
  const {dateAndTime} = req.body
  // const { artistId, customerId, size, image, bodyPlace, description, dateAndTime } = req.body;
  // try {
  //   const newCreateAppointment = await createAppointment(
  //     {artistId,
  //     customerId,
  //     size,
  //     image,
  //     bodyPlace,
  //     description,
  //     dateAndTime}
  //   );
  //   res.status(201).json(newCreateAppointment);
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }

  const artistId = "f2c9231e-259b-42ce-953e-9007e26de11c"
  const customerId = "c1afee1b-6705-49b7-a7c5-2e296a73a2ec"

  try{
    const newCreateAppointment = await createAppointment(
      {
        artistId,
        customerId,
        size: "pequeño",
        bodyPlace: "brazo",
        description: "descripcion",
        dateAndTime,
        duration: 6
      }
    )
  
    return res.status(200).send(newCreateAppointment)
  } catch (error) {
    console.log(error)
  }
};

module.exports = createAppointmentHandler;
