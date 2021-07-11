const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.status(401);

  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.status(403);
    console.log(user);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
