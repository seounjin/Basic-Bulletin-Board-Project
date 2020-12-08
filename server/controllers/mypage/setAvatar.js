const { avatar }  = require('./helpers');

// ./public/img/
const setAvatar = async(req, res) => {

    try {

        const userId = req.body.id;
        const file = req.file.filename;

        await avatar(userId, file);

        return res.status(200).json( { success: true, file: file } );

    } catch (err) {
        console.log("setAvatar  ", err)
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { setAvatar };