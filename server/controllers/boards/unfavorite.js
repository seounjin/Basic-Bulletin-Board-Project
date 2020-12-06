const { unfavoritePost } = require('./helpers/favorite');

const unfavorite = async(req, res) => {

    try {
        const favoriteInfo = req.body;

        await unfavoritePost(req.body.postNum, req.body.userId);

        return res.status(200).json( { success: true } );
        
    } catch (err) {
        console.log("unfavorite  ",err)
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { unfavorite };