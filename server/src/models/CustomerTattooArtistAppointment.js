const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "CustomerTattooArtistAppointment",
    {
      CustomerId: {
        type: DataTypes.UUID,
        unique: false,
      },
      TattooArtistId: {
        type: DataTypes.UUID,
        unique: false,
      },
      AppointmentId: {
        type: DataTypes.UUID,
        unique: false,
      },
    },
    { timestamps: false }
  );
};
