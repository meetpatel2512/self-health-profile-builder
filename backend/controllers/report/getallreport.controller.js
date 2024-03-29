const healthreport = require('../../models/Health Report/healthreport.model');
const register = require('../../models/user/register.model');

const getallreport = async (req, res) => {
  try {
    const email = await req.data;
    const user = await register.findOne({ email });
    const userid = user.id;
    const allreport = await healthreport.find({ userid });
    res.status(200).json({
      Authentication: true,
      username: user.name,
      allreport,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = getallreport;
