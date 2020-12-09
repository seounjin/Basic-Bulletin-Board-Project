const { activityTotal, userPost, userComment } = require('./helpers');

const getUserPost = async(req, res) => {

    try {

        let totalPost;
        let activityList;

        if ( req.body.type === '게시물') {
            totalPost = await activityTotal(req.body.id, 0);
            activityList = await userPost(req.body);
        } else {
            totalPost = await activityTotal(req.body.id, 1);
            activityList = await userComment(req.body);
        }

        const pageData = {
            totalPage : totalPost
        }

        return res.status(200).json( {success: true , activityList, pageData }  );

    } catch (err) {

        console.log("여기getUserPost  ", err);
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { getUserPost };