const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "TimeAvailabilityException",
    {
      date: {
        type: DataTypes.DATEONLY,
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
