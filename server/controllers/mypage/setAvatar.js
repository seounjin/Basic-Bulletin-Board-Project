const { avatar } = require('./helpers');

const setAvatar = async(req, res) => {

    try {
        const info = await userProfile(req.body.id);
        return res.status(200).json( { success: true, info: info } );

    } catch (err) {
        console.log("getProfile  ", err)
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { setAvatar };