const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('./Users.model');

const router = express.Router();

// * display all users
router.get('/', async (req, res) => {
  const allUsers = await Users.query();
  res.status(200).json(allUsers);
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
