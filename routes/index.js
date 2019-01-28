const routes = require('express').Router();
const teacher = require('./teachers');
const subject = require('./subjects');
const student = require('./students');

routes.get('/', (req, res) => {
  res.render('index');
});

routes.use('/teachers', teacher);
routes.use('/subjects', subject);
routes.use('/students', student);

module.exports = routes;