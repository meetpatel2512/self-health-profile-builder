const healthreport = require('../../models/Health Report/healthreport.model');
const register = require('../../models/user/register.model');

const reportController = async (req, res) => {
  try {
    const { name, gender, age, weight, hight, bp, date } = req.body;

    const email = await req.data;

    const userid = await register.findOne({ email });

    const report = await healthreport.create({
      name,
      gender,
      age,
      weight,
      hight,
      bp,
      userid,
      date,
    });
    res.status(200).json({
      Authentication: true,
      report,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      Authentication: false,
      message: 'Something went wrong...',
    });
  }
};
module.exports = reportController;
