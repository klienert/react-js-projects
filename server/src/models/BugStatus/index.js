const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class BugStatus extends Model {}

    BugStatus.init(
        {
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            }
        },
        {
            sequelize,
            tableName: 'BugStatus',
            modelName: 'BugStatus',
            freezeTableName: true,
            timestamps: true,
            createdAt: true,
            updatedAt: true
        }
    );
    return BugStatus;
};