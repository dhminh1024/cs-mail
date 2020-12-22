const utilsHelper = require("../helpers/utils.helper");
const User = require("../models/User");
const authController = {};

authController.loginWithEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });
    let user = await User.findOne({ email });
    if (!user) return next(new Error("401 - Email not exists"));

    if (user.password !== password)
      return next(new Error("401 - Wrong password"));

    utilsHelper.sendResponse(res, 200, true, { user }, null, "Login success");
  } catch (error) {
    next(error);
  }
};

module.exports = authController;
