const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "PriceRange",
    {
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
      priceMin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      priceMax: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
