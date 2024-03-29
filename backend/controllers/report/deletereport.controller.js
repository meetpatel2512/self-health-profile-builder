const healthreport = require('../../models/Health Report/healthreport.model');
const register = require('../../models/user/register.model');

const deleteController = async (req, res) => {
  try {
    const _id = req.params;
    const deleteuser = await healthreport.findByIdAndDelete(_id.id);
    res.status(200).json({
      Authentication: true,
      message: 'Delete user Sucessfully',
      data: deleteuser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      Authentication: false,
      message: 'Something went wrong...',
    });
  }
};
module.exports = deleteController;
