const jwt = require('jsonwebtoken');

const authuser = async (req, res, next) => {
  const token = await req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      Authentication: false,
      error: 'please Authenticate using valid token',
    });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.data = user.email;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      Authentication: false,
      error: 'please Authenticate using valid token',
    });
  }
};

module.exports = authuser;
