const express = require('express');
const router = express.Router();
const { registerUser, login, logout, tokenRequest, userState } = require('../controllers/users');
const { auth } = require("../middleware/auth");
const { publicKey } = require("../controllers/auth");
const { validateLogin, validateRegister } = require('../controllers/users/validators');


router.post("/register", validateRegister, registerUser);

router.post("/login", validateLogin, login);

router.get("/logout", auth, logout);

router.get("/publickey", publicKey);

router.get("/auth", auth, userState);

router.get("/token",tokenRequest);


module.exports = router;
