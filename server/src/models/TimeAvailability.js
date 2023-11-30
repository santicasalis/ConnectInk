const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "TimeAvailability",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      day: {
        type: DataTypes.ENUM(
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
          "Domingo"
        ),
        allowNull: false,
      },
      initialHour: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      finalHour: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
