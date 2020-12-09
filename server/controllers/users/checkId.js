const { findUser } = require('./helpers');

const checkId = async(req, res) => {
    
    try {
        const userId = req.body.userId;
        
        const result = await findUser(userId);

        if (!result){
            return res.status(200).json( { success: true, available: true } );
        } else {
            return res.status(200).json( { success: true, available: false } );
        }

    } catch (err) {
        console.log("checkId err",err);
        return res.status(400).json( { success: false, err } );
    }
};


module.exports = { checkId };