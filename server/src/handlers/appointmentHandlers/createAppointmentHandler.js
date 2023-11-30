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

  const artistId = "300ca293-b849-4cd4-8d9d-042ae7f39927"
  const customerId = "6b3c1e56-9cb1-40d0-bee7-28f59e65d851"

  try{
    const newCreateAppointment = await createAppointment(
      {
        artistId,
        customerId,
        size: "grande",
        bodyPlace: "pierna",
        description: "nhjsacjdosa",
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
