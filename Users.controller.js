const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('./Users.model');

const router = express.Router();

// * display all users
router.get('/', async (req, res) => {
  const allUsers = await Users.query();
  res.status(200).json(allUsers);
});

// * create a user
router.post('/', async (req, res) => {
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
  res
    .status(200)
    .json(`User with username ${userObj.username} successfully created`);
});

// * validate a specific user
router.post('/validate', async (req, res) => {
  const { username: userName, password } = req.body;
  const userObj = await Users.query().findOne({
    username: userName,
  });
  const passwordCheck = await bcrypt.compare(password, userObj.password);
  if (passwordCheck === true) {
    res.status(200).json('authorized');
  } else {
    res.status(403).json('unauthorized');
  }
});

module.exports = router;
