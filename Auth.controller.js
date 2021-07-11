const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('./Users.model');

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

module.exports = router;
