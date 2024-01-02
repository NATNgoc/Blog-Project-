const fs = require("fs")
const YAML = require('yaml');
const path = require('path');
const file = fs.readFileSync(path.resolve('./docs/techHub.docs.yaml'), 'utf8')
const swaggerDocument = YAML.parse(file)
const urlDocs = '/api/v1/docs'
const swaggerUi = require('swagger-ui-express');

module.exports = (app) => {
    app.use(urlDocs, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}