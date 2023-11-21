const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "TattoArtist",
    {
      id: {
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
