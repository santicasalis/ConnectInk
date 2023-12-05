const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Review", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      isUrl: true,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    TattooArtistId: {
      type: DataTypes.UUID,
    },
    CustomerId: {
      type: DataTypes.UUID,
    },
    AppointmentId: {
      type: DataTypes.UUID
    }
  }, {
    indexes: [
      {
        unique: false,
        fields: ['TattooArtistId', 'CustomerId', "AppointmentId"],
      },
    ],
  });
};