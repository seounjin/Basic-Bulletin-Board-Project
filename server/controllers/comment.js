const Comment = require('../models/Comment');


// 부모 댓글 저장
const parent = async(req, res) => {
    
    try {
        const commentData = req.body;
        const { pNum, cWriter, pComment,date, gDepth, currentPage} = commentData;
        const maxComment = 10; // 10개 고정

        const result = await Comment.saveParentComment(commentData);
        const comment = await Comment.getComment(pNum, currentPage, maxComment);

        return res.status(200).json( { success: true, cGroupsquence: result._id, comment} );            

    } catch (err) {
        console.log("parent",err);
        return res.status(400).json( { success: false, err } );
    }
}; 

// 자식 댓글 저장
const child = async(req, res) => {

    try {
        const commentData = req.body;
        const { pNum, gNum, cWriter,pComment, date ,gDepth, currentPage} = commentData;
        const maxComment = 10; // 10개 고정

        const result = await Comment.savechildComment(commentData);
        const comment = await Comment.getComment(pNum, currentPage, maxComment);

       
        return res.status(200).json( { success: true, cGroupsquence: result._id, comment} );            

    } catch (err) {
        console.log("child",err);
        return res.status(400).json( { success: false, err } );
    }
}; 

// 등록순으로 댓글 요청
const registerComment = async(req, res) => {
    
    try {
        const commentData = req.body;
        const { postNum, commentPage } = commentData;
        const maxComment = 10; // 10개 고정
        
        // 코멘트 갯수
        const cnt = await Comment.getCount(postNum);

        //등록순으로 불러오기
        const comment = await Comment.getComment(postNum, commentPage, maxComment);


        return res.status(200).json( {success: true , comment, commentCnt : cnt } );
                
    } catch (err) {
        console.log("registerComment",err);
        return res.status(400).json( { success: false, err } );
    }
}; 

//최신순
const latestComment = async(req, res) => {
    
    try {
        const commentData = req.body;
        const { postNum, commentPage} = commentData;
        const maxComment = 10; // 10개 고정
        
        const cnt = await Comment.getCount(postNum);

        const comment = await Comment.getLatestComment(postNum, commentPage, maxComment);

        return res.status(200).json( {success: true , comment, commentCnt : cnt } );
                
    } catch (err) {
        console.log("latestComment",err);
        return res.status(400).json( { success: false, err } );
    }
};

const deleteComment = async(req, res) => {
    
    try {
        const cGroupSquence = req.params.cNum;
        
        await Comment.deleteC(cGroupSquence);

        return res.status(200).json({ success: true });

    } catch (err) {
        console.log("deleteComment",err);
        return res.status(400).json({ success: false, err });
    }
};

const change = async(req, res) => {

    try {
        const commentData = req.body;
        const { cGroupSquence, pComment} = commentData;
        
        await Comment.modifyComment(commentData);

        return res.status(200).json({ success: true });

    } catch (err) {
        console.log("change",err);
        return res.status(400).json({ success: false, err });
    }
};

module.exports = { parent,child, registerComment, latestComment, deleteComment, change};
