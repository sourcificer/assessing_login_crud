require('dotenv').config();
const express = require('express');
const dbSetup = require('./dbSetup');
const notes = require('./Notes.controller');

dbSetup();

const app = express();
const port = process.env.API_PORT;

app.use(express.json());

// eslint-disable-next-line no-unused-vars
app.get('/', (req, res) => {
  console.log('Welcome to the home page');
});

app.use('/notes', notes);

app.listen(port, () => console.log(`listenning at port ${port}`));
