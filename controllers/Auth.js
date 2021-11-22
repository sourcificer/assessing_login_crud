const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const router = express.Router();

function generateAccessToken(userId, userName) {
  return jwt.sign(
    { id: userId, username: userName },
    process.env.TOKEN_SECRET,
    {
      expiresIn: '90000s',
      // eslint-disable-next-line prettier/prettier
    },
  );
}

router.post('/createuser', async (req, res) => {
  const { username: userName, password } = req.body;
  const userExists = await Users.query().findOne({
    username: userName,
  });
  if (userExists !== undefined) {
    res.status(409).json('A user with the given username already exists');
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userObj = await Users.query().insert({
    username: userName,
    password: hashedPassword,
  });
  console.log(userObj);
  const token = generateAccessToken(userObj.id, userObj.username);
  res.status(200).json(token);
});

router.post('/login', async (req, res) => {
  const { username: userName, password } = req.body;
  const userExists = await Users.query().findOne({
    username: userName,
  });
  if (userExists === undefined) {
    res.status(401).json('Username or password incorrect.');
    return 'Username or password incorrect';
  }

  const passwordCheck = await bcrypt.compare(password, userExists.password);
  console.log(passwordCheck);
  if (passwordCheck === true) {
    const token = generateAccessToken(userExists.id, userExists.username);
    res.status(200).json(token);
  } else {
    res.status(401).json('Username or password incorrect.');
    return 'Username or password incorrect';
  }
  return '';
});

module.exports = router;
