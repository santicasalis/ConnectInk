const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'Admin', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
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
        admin: {
            type: DataTypes.STRING,
            defaultValue: true
        },
        disabled: {
            type: DataTypes.STRING,
            defaultValue: false
        }
    },
        { timestamps: false }
    );
};