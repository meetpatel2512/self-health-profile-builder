const login = require('../../models/user/login.model');
const register = require('../../models/user/register.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const LoginController = async (req, res) => {
  try {
    // Check if the user input is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find the user in the register model
    const user = await register.findOne({ email });

    // If user doesn't exist, return an error
    if (!user) {
      return res
        .status(404)
        .json({ message: 'Invalid username and password', success: false });
    }

    // Check if the provided password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Generate a JWT token
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      // Set the JWT token as a cookie
      res.cookie('Session_id', token);

      // Return success message along with login details
      return res.status(200).json({
        message: 'User Login Successfully',
        success: true,
        username: user.name,
        data: { token },
      });
    }

    // If password is incorrect, return an error
    const failedLoginAttempt = await login.create({ email, success: false });
    return res
      .status(401)
      .json({ message: 'Invalid username and password', success: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = LoginController;
