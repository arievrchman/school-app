const routes = require('express').Router();
const subject = require('./subject');

routes.get('/', subject);
routes.get('/add', subject);
routes.post('/add', subject);
routes.get('/edit/:id', subject);
routes.post('/edit/:id', subject);
routes.get('/delete/:id', subject);

module.exports = routes;