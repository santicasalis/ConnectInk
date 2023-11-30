const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("PriceRange", {
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
    priceMin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceMax: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
