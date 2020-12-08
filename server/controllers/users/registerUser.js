const { save } = require('../users/helpers');

const registerUser = async(req, res) => {
    
    try {
        const userInfo = req.body;
        const { id, password, email } = userInfo;

        await save(userInfo);

        return res.status(200).json( { success: true } );

    } catch (err) {
        console.log("registerUser err",err);
        return res.status(400).json( { success: false, err } );
    }
};


module.exports = { registerUser };