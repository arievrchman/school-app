const routes = require('express').Router();
const student = require('./student');

routes.get('/', student);
routes.get('/add', student);
routes.post('/add', student);
routes.get('/edit/:id', student);
routes.post('/edit/:id', student);
routes.get('/delete/:id', student);
routes.get('/:id/add-subject', student);
routes.post('/:id/add-subject', student);

module.exports = routes;