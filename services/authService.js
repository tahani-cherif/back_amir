const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')
const usermodel=require('../models/userModel')
const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs');


// @desc    signup
// @route   GET /api/auth/signup
// @access  Public
exports.signup=asyncHandler(async(req,res,next)=>{
// 1- Create user
const user = await usermodel.create({
    last_name:req.body.last_name,
    first_name:req.body.first_name,
    email:req.body.email,
    role:req.body.role,
    password: req.body.password,
  });

  // 2- Generate token
  const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
    expiresIn: process.env.JWT_EXPIRE_TIME
  });

  res.status(201).json({ data: user, token });
});
// @desc    Login
// @route   GET /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    // 1) check if password and email in the body (validation)
    // 2) check if user exist & check if password is correct
    const user = await usermodel.findOne({ email: req.body.email });
  
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return next(new ApiError('Incorrect email or password', 401));
    }
    // 3) generate token
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRE_TIME
      });
  
    // Delete password from response
    delete user._doc.password;
    // 4) send response to client side
    res.status(200).json({ data: user, token });
  });