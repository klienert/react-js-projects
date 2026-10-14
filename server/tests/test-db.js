require('dotenv').config();

const sequelize = require('../src/config/db');
const Accounts = require('../src/models/Accounts');

const testDB = async () => {
    try {
        // verify connection
        await sequelize.authenticate();
        console.log('MYSQL connection established');

        // create table
        // await Accounts.sync();
        // console.log('Accounts table is ready.');

        // check 
        const [tables] = await sequelize.query('SHOW TABLES');

        console.log('Tables in current db: ', tables);

    } catch (error) {
        console.error('DB setup failed: ', error);
    } finally {
        await sequelize.close();
    }
}

testDB();