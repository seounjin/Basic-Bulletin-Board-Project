const { modifyComment } = require('./helpers');

const change = async(req, res) => {

    try {
        const commentData = req.body;
        const { cGroupSquence, pComment} = commentData;
        
        await modifyComment(commentData);

        return res.status(200).json({ success: true });

    } catch (err) {
        console.log("change",err);
        return res.status(400).json({ success: false, err });
    }
};

module.exports = { change };

