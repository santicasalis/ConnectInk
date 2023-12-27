const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "TimeAvailabilityException",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      initialHour: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      finalHour: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      secondInitialHour: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      secondFinalHour: {
        type: DataTypes.TIME,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
