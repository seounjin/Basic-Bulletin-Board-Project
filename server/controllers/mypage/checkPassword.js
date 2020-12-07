const { confirm } = require('./helpers');

const checkPassword = async(req, res) => {

    try {

        const result = await confirm(req.body);

        if (result == 0) {
            return res.json({ loginSuccess: false });
        } else if (result == 1) {
            return res.json({ success: false });
        } else if (result == 2) {
            return res.status(200).json({ success: true });
        }
        
    } catch (err) {
        console.log("checkPassword  ", err)
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { checkPassword };