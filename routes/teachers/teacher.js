const routes = require('express').Router();
const Teacher = require('../../models').Teacher;
const Subject = require('../../models').Subject;

// READ
routes.get('/', (req, res) => {
  Teacher
    .findAll({
      order: [['id', 'ASC']],
      include: [{
        model: Subject
      }]
    })
    .then((teachers) => {
      // console.log(teachers[0].dataValues.Subject.subject_name);
      res.render('teachers/teacher', { teachers });
    })
    .catch((err) => {
      res.send(err);
    });
});

// UPDATE
routes.get('/edit/:id', (req, res) => {
  let dataTeacher;
  Teacher
    .findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Subject
      }]
    })
    .then((teacher) => {
      dataTeacher = teacher;
      return Subject.findAll();
    })
    .then((subjects) => {
      res.render('teachers/edit', { dataTeacher, subjects });
    })
    .catch((err) => {
      res.send(err);
    });
});

routes.post('/edit/:id', (req, res) => {
  Teacher
    .update({
      id: req.params.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      SubjectId: req.body.subject_id
    }, {
        where: {
          id: req.params.id
        }
      })
    .then(() => {
      res.redirect('/teachers');
    })
    .catch((err) => {
      res.send(err);
    });
});

// CREATE
routes.get('/add', (req, res) => {
  Subject
    .findAll()
    .then((subjects) => {
      let msg = req.query.errors;
      res.render('teachers/add', { subjects, msg });
    })
    .catch((err) => {
      res.send(err);
    });
});

routes.post('/add', (req, res) => {
  Teacher
    .create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      SubjectId: req.body.subject_id
    })
    .then(() => {
      res.redirect('/teachers');
    }).catch((err) => {
      res.redirect(`/teachers/add?errors=${(err.errors[0].message)}`);
    });
});

// DELETE
routes.get('/delete/:id', (req, res) => {
  Teacher
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.redirect('/teachers');
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = routes;