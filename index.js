require('dotenv').config();
const express = require('express');
const dbSetup = require('./dbSetup');
const notes = require('./Notes.controller');
const users = require('./Users.controller');
const auth = require('./Auth.controller');
const authenticateToken = require('./Auth.middleware');
// * to delete later
const Users = require('./Users.model');

dbSetup();

const app = express();
const port = process.env.API_PORT;

app.use(express.json());
app.use(/\/((?!usersAll|auth\/createuser).)*/, authenticateToken);

// eslint-disable-next-line no-unused-vars
app.get('/', (req, res) => {
  res.status(200).json('Welcome to the home page');
});

// * to delete later
app.get('/usersAll/', async (req, res) => {
  const allUsers = await Users.query();
  res.status(200).json(allUsers);
});

app.use('/notes', notes);

app.use('/users', users);

app.use('/auth', auth);

app.listen(port, () => console.log(`listenning at port ${port}`));
