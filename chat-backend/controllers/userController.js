import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';
// const asyncHandler = require("express-async-handler");
// const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, picture } = req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error(`Please Enter all the Feilds${req.body}`);
    }
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const user = await User.create({
      name,
      email,
      password,
      picture,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        picture: user.picture,
        // token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });
  export  {registerUser}