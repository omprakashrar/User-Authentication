const userModel = require("../model/userSchema");
// const emailValidator = require("email-validate");

const signup = async (req, res, next) => {
  const { name, email, password, confirmpassword } = req.body;

  //to print what is send by user
  console.log(name, email, password, confirmpassword);
  if (!name || !email || !password || !confirmpassword) {
    return res.status(400).json({
      success: false,
      message: "missing required fields",
    });
  }

  //   const validEmail = emailValidator.validate(email);
  //   if(!validEmail){
  //     return res.status(400).json({
  //         success: false,
  //         message:'Please provide a valid email id',
  //     })
  // }
  if (!(password !== confirmpassword)) {
    return res.status(400).json({
      success: false,
      message: "Password and confirm password doesn't match",
    });
  }
  try {
    const userInfo = userModel(req.body);
    const result = await userInfo.save();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Account already exists with provided emil id",
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields mandatory",
    });
  }
  try {
    const user = await userModel
      .findOne({
        email,
      })
      .select("+password");

    if (!user || user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = user.jwtToken();
    user.password = undefined;
    const cookieOption = {
      maxAge: 1 * 60 * 60 * 1000,
      httpOnly: true, // to prevent client side js from accessing the cookies
    };
    res.cookie("token", toekn, cookieOption);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  signin,
};
