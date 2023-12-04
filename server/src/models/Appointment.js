const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Appointment", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    size: {
      type: DataTypes.ENUM(
        "Pequeño",
        "Pequeño a color",
        "Mediano",
        "Mediano a color",
        "Grande",
        "Grande a color"
      ),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bodyPlace: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dateAndTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    depositPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
