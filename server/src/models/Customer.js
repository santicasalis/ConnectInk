const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Customer",
    {
      customer_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
