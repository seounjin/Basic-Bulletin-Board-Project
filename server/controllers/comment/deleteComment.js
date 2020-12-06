const { deleteC } = require('./helpers');



const deleteComment = async(req, res) => {
    
    try {
        const cGroupSquence = req.params.cNum;
        
        await deleteC(cGroupSquence);

        return res.status(200).json({ success: true });

    } catch (err) {
        console.log("deleteComment",err);
        return res.status(400).json({ success: false, err });
    }
};

module.exports = { deleteComment };

