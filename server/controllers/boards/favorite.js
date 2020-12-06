const { favoritePost } = require('./helpers/favorite');

const favorite = async(req, res) => {

    try {
        const favoriteInfo = req.body;

        console.log("favorite", req.body, "\n");

        await favoritePost(req.body.postNum, req.body.userId);

        return res.status(200).json( { success: true } );
        
    } catch (err) {
        console.log("favorite  ",err)
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { favorite };