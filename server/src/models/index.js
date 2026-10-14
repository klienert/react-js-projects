const fs = require("fs");
const path = require("path");
const sequelize = require('../config/db');

const models = {};

const modelFiles = fs
    .readdirSync(__dirname)
    .filter(
        (file) => 
            file !== 'index.js' && file.endsWith('.js')
    );

// initialize every model
for (const files of modelFiles) {
    const initializeModel = require(path.join(__dirname, file));
    const model = initializeModel(sequelize);

    models[model.name] = model;
}

// fs.readdirSync(__dirname)
//     .filter(file => 
//         file !== 'index.js' &&
//         file.endsWith(".js")
//     )
//     .forEach(file => {
//         const model = require(path.join(__dirname, file));
//         const sequelizeModel = model.initModel(sequelize);

//         db[sequelizeModel.name] = sequelizeModel;
//         db[sequelizeModel.name].associate =
//             model.associate;
//     });

// Build associations after all models exist
// Object.values(db).forEach(model => {
//     if (model.associate) {
//         model.associate(db);
//     }
// });

models.sequelize = sequelize;

module.exports = models;