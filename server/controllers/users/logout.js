const { tokenDelete } = require('../users/helpers');

const logout = async(req, res) => {
    
    try {
        const id = req.user._id;

        await tokenDelete(id);

        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
           .status(200).send({ success: true })

    } catch (err) {
        console.log("에러",err);
        return res.status(400).json( { success: false, err } );
    }
};


module.exports = { logout };
