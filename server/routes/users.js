const express = require('express');
const { userRegister, userLogin, generateToken } = require('../models/User');
const router = express.Router();
const cookie_parser = require('cookie-parser');


router.post("/register", (req, res) => {

    userRegister(req.body, (err) => {

        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true });
    });
});

router.post("/login", (req, res) => {

    userLogin(req.body, (err, isMatch) => {

        if (err) return res.json({ 
            loginSuccess: false
        });

        
        generateToken(req.body,(err,token) => {

            if (err) return res.status(400).send(err);
            res.cookie("w_authExp", "1111");
            res
                .cookie("w_auth", token)
                .status(200)
                .json({
                    loginSuccess: true, userId: req.body.id
                });

        })
        
    });

});

module.exports = router;
