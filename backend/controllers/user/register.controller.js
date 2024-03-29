const register = require('../../models/user/register.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registercontroller = async (req, res) => {
  try {
    // check the user if every feild is correct or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, cpassword } = req.body;

    const existing = await register.findOne({ email });

    if (existing) {
      return res
        .status(401)
        .json({ message: 'User already Exist', success: false });
    }
    if (password !== cpassword) {
      return res.status(401).json({
        message: 'Password and Confirm Password do not match',
        success: false,
      });
    }

    // generate has password
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password, salt);

    if (email) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      await res.cookie('Session_id', token);

      // add data in databse
      const user = await register.create({ name, email, password: hashpass });
      res.status(200).json({
        message: 'data saved sucessfully',
        username: user.name,
        data: { token },
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = registercontroller;
