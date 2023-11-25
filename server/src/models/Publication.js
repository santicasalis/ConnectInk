const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'Publication', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            isUrl: true,
            allowNull: false,
        },

    },
        { timestamps: false }
    );
};