require('dotenv').config();
const sequelize = require('../src/config/db');

const testDB = async () => {
    try {
        // verify connection
        await sequelize.authenticate();
        console.log('MYSQL connection established');

        // check 
        const [tables] = await sequelize.query('SHOW TABLES');

        console.log('Tables in current db: \n', tables);

    } catch (error) {
        console.error('DB setup failed: ', error);
    } finally {
        await sequelize.close();
    }
}

testDB();