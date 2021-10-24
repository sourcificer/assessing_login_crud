require('dotenv').config();
const express = require('express');
const dbSetup = require('./dbSetup');
const notes = require('./controllers/Notes');
const users = require('./controllers/Users');
const auth = require('./controllers/Auth');
const authenticateToken = require('./middleware/Auth');
// * to delete later
const Users = require('./models/Users');

dbSetup();

const app = express();
const port = process.env.API_PORT;

app.use(express.json());
app.use(/\/((?!user-all|auth\/createuser|\/).)*/, authenticateToken);

// eslint-disable-next-line no-unused-vars
app.get('/', (req, res) => {
  res.status(200).json('Welcome to the home page');
});

// ! to delete later
app.get('/user-all/', async (req, res) => {
  const allUsers = await Users.query();
  res.status(200).json(allUsers);
});

app.use('/notes', notes);

app.use('/users', users);

app.use('/auth', auth);

app.listen(port, () => console.log(`listenning at port ${port}`));
