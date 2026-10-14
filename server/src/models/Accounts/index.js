const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/db');

module.exports = (sequelize) => {
    class Accounts extends Model {}

    Accounts.init(
     {
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        account_name: {
            type: DataTypes.STRING
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password_hash: {
            type: DataTypes.STRING
        },
        portrait_image: {
            type: DataTypes.BLOB
        },
        hourly_rate: {
            type: DataTypes.DECIMAL
        }
    },
    {
        sequelize,
        tableName: 'Accounts',
        modelName: 'Accounts',
        freezeTableName: true,
        timestamps: true,
        createdAt: true,
        updatedAt: true
    });
    return Accounts;
};