const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('./Users.model');

const router = express.Router();

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

// * get logged in user's information
router.get('/me', (req, res) => {
  const userObj = req.user;
  res.status(200).json({
    username: userObj.username,
  });
});

module.exports = router;
