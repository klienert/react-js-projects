const { Sequelize } = require("sequelize");

const required = [
    "DB_HOST",
    "DB_PORT",
    "DB_NAME",
    "DB_USER"
];

required.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
    }
})

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",

        logging: false,

        define: {
            timestamps: true,
            underscored: true,
            freezeTableName: false,
        },

        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },

        dialectOptions: {
            charset: "utf8mb4",
        },
    }
);

module.exports = sequelize;