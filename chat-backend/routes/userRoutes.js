import express from 'express'
import {registerUser} from '../controllers/userController.js'

// const express = require("express");
// const {registerUser} = require("../controllers/userController");


const router =express.Router()

router.route("/").post(registerUser)

export default router
// module.exports = router