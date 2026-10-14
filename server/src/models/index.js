const fs = require('fs');
const path = require('path');
const sequelize = require('../config/db');

const models = {};

const modelEntries = fs.readdirSync(__dirname, {
    withFileTypes: true,
});

// Find model files directly in models/ and index.js files
// inside model subdirectories.
const modelFiles = modelEntries
    .filter((entry) => entry.name !== 'index.js')
    .flatMap((entry) => {
        if (entry.isFile() && entry.name.endsWith('.js')) {
            return [path.join(__dirname, entry.name)];
        }

        if (entry.isDirectory()) {
            const indexFile = path.join(
                __dirname,
                entry.name,
                'index.js'
            );

            return fs.existsSync(indexFile) ? [indexFile] : [];
        }

        return [];
    });

// Initialize all discovered models
for (const file of modelFiles) {
    const initializeModel = require(file);
    const model = initializeModel(sequelize);

    models[model.name] = model;
}

// Initialize associations, if defined
Object.values(models).forEach((model) => {
    if (typeof model.associate === 'function') {
        model.associate(models);
    }
});

models.sequelize = sequelize;

module.exports = models;
