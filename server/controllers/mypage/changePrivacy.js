const { privacy } = require('./helpers');

const changePrivacy = async(req, res) => {

    try {
        await privacy(req.body);
        return res.status(200).json( { success: true } );
    } catch (err) {
        console.log("changePrivacy  ", err)
        return res.status(400).json( { success: false } );
    }
};

module.exports = { changePrivacy };