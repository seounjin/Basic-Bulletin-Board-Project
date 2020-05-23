const express = require('express');
const { userRegister } = require('../models/User');
const router = express.Router();


router.post("/register", (req, res) => {

    userRegister(req.body, (err) => {

        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true });
    });
});

module.exports = router;
