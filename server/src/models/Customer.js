const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Customer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    tokenId:{
      type: DataTypes.STRING
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      isUrl: true,
      defaultValue:
      "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg",
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userType: {
      type: DataTypes.STRING,
      defaultValue: "customer",
    }
  },
    { timestamps: false }
  );
};