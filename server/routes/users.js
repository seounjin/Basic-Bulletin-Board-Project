const express = require('express');
const router = express.Router();
const { registerUser, login, logout, tokenRequest, userState } = require('../controllers/users');
const { auth } = require("../middleware/auth");
const { publicKey } = require("../controllers/auth");


router.post("/register", registerUser);

router.post("/login", login);

router.get("/logout", auth, logout);

router.get("/publickey", publicKey);

router.get("/auth", auth, userState);

router.get("/token",tokenRequest);


module.exports = router;
