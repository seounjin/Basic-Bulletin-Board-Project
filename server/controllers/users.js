const User = require('../models/User')


const registerUser = async(req, res) => {
    
    try {
        const userInfo = req.body;
        const { id, password, email } = userInfo;

        console.log(id);
        await User.save({ id, password, email });

        return res.status(200).json( { success: true } );

    } catch (err) {
        console.log("에러",err);
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { registerUser };
