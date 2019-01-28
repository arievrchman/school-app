const routes = require('express').Router();
const Teacher = require('../../models').Teacher;
const Subject = require('../../models').Subject;

// READ
routes.get('/', (req, res) => {
  Subject
    .findAll({
      include: [{
        model: Teacher
      }]
    })
    .then((subjects) => {
      res.render('subjects/subject', { subjects });
    })
    .catch((err) => {
      res.send(err);
    });
});

// CREATE
routes.get('/add', (req, res) => {
  res.render('subjects/add');
});

routes.post('/add', (req, res) => {
  Subject
    .create({
      subject_name: req.body.subject_name
    })
    .then(() => {
      res.redirect('/subjects');
    })
    .catch((err) => {
      res.send(err);
    });
});

//UPDATE
routes.get('/edit/:id', (req, res) => {
  Subject
    .findByPk(req.params.id)
    .then((subject) => {
      res.render('subjects/edit', { subject });
    })
    .catch((err) => {
      res.send(err);
    });
});

routes.post('/edit/:id', (req, res) => {
  Subject
  .update({
    id: req.params.id,
    subject_name: req.body.subject_name
  })
  .then(() => {
    res.redirect('/subjects');
  })
  .catch((err) => {
    res.send(err);
  });
});

// DELETE
routes.get('/delete/:id', (req, res) => {
  Subject
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.redirect('/subjects');
    }).catch((err) => {
      res.send(err);
    });
});

module.exports = routes;