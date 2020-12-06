const { checkFavoritePost } = require('./helpers/favorite');

const checkFavorite = async(req, res) => {

    try {
        const favorite = await checkFavoritePost(req.body.postNum, req.body.userId);

        return res.status(200).json( { success: true, favorite: favorite } );
        
    } catch (err) {
        console.log("checkFavorite  ",err)
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { checkFavorite };