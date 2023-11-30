const { DataTypes } = require("sequelize");
const {TattooArtist} = require("../models/TattooArtist")
const {Customer} = require("../models/Customer")

module.exports = (sequelize) => {
  sequelize.define("Appointment", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    size: {
      type: DataTypes.ENUM("pequeño", "pequeño a color", "mediano", "mediano a color", "grande", "grande a color"),
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
    description:{
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
    // CustomerId: {
    //   type: DataTypes.UUID,
    //   references: {
    //     model: Customer,
    //     key: "id",
    //   }
    // },
    // TattooArtistId: {
    //   type: DataTypes.UUID,
    //   references: {
    //     model: TattooArtist,
    //     key: "id",
    //   }
    // },
  });
};
