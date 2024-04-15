const express = require("express");
const router = express.Router();
const AuthController = require("../controller/authController");

const auth = new AuthController();
router.post("/login", auth.login);
router.patch("/logout", auth.logout);

module.exports = router;
