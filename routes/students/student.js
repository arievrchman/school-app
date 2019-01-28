const routes = require('express').Router();
const Student = require('../../models').Student;
const Subject = require('../../models').Subject;
const SubjectStudent = require('../../models').SubjectStudent;

// READ
routes.get('/', (req, res) => {
  Student
    .findAll({
      order: [['id', 'ASC']]
    })
    .then((students) => {
      // res.send(students);
      res.render('students/student', { students });
    })
    .catch((err) => {
      res.send(err);
    });
});

// CREATE
routes.get('/add', (req, res) => {
  res.render('students/add');
});

routes.post('/add', (req, res) => {
  Student
    .create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    })
    .then((result) => {
      res.redirect('/students');
    })
    .catch((err) => {
      res.send(err);
    });
});

// UPDATE
routes.get('/edit/:id', (req, res) => {
  Student
    .findByPk(req.params.id)
    .then((student) => {
      res.render('students/edit', { student });
    })
    .catch((err) => {
      res.send(err);
    });
});

routes.post('/edit/:id', (req, res) => {
  Student
    .update({
      id: req.params.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    }, {
        where: {
          id: req.params.id
        }
      })
    .then(() => {
      res.redirect('/students');
    })
    .catch((err) => {
      res.send(err);
    });
});

// DELETE
routes.get('/delete/:id', (req, res) => {
  Student
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then((result) => {
      res.redirect('/students');
    })
    .catch((err) => {
      res.send(err);
    });
});

// ADD SUBJECT
routes.get('/:id/add-subject', (req, res) => {
  let dataStudent;
  Student
    .findByPk(req.params.id)
    .then((result) => {
      dataStudent = result;
      return Subject.findAll()
    })
    .then((subjects) => {
      // res.send(subjects);
      res.render('students/add-subject', { dataStudent, subjects });
    })
    .catch((err) => {
      res.send(err);
    });
});

routes.post('/:id/add-subject', (req, res) => {
  SubjectStudent
    .create({
      SubjectId: req.body.subject_id,
      StudentId: req.params.id
    })
    .then(() => {
      res.redirect('/students');
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = routes;