const express = require('express');
const app = express();
const routes = require('./routes/');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(3000, () => {
  console.log(`App listening on port`, 3000);
});