const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Bugs extends Model {}

    Bugs.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },            
        },
        {
            sequelize,
            tableName: 'Bugs',
            modelName: 'Bugs',
            freezeTableName: true,
            timestamps: true,
            createdAt: true,
            updatedAt: true
        }
    );
    return Bugs;
};