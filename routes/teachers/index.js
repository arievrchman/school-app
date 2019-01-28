const routes = require('express').Router();
const teacher = require('./teacher');

routes.get('/', teacher);
routes.get('/add', teacher);
routes.post('/add', teacher);
routes.get('/edit/:id', teacher);
routes.post('/edit/:id', teacher);
routes.get('/delete/:id', teacher);

module.exports = routes;