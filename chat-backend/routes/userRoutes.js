import express from 'express'
import { registerUser,authUser} from '../controllers/userController.js'

// const express = require("express");
// const {registerUser} = require("../controllers/userController");


const router =express.Router()

router.route("/").post(registerUser)
router.post("/login",authUser)

export default router
// module.exports = router