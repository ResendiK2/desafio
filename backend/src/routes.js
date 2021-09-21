
const { Router } = require('express');

const CompanyController = require('./controllers/CompanyController');

const routes = Router();

routes.get('/', CompanyController.index);
routes.post('/company', CompanyController.store);
routes.post('/search', CompanyController.search);

module.exports = routes;

