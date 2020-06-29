const express = require('express');
const response = require('./middlewares/response');
const db = require('./models');

const authController = require('./controllers/auth');

const app = express();

// Middlewares 
app.use(response);

// Middleware para usar o req.body por exemplo
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authController);

app.get('/', (req, res) => {
  return res.json('Api running ...');
});

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Listening on port 3001');
  });
});
