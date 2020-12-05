const Comment = require('../../../models/Comment');

const deleteC = async cGroupSquence => {

    mongoose.connect(config.mongoURI, config.options);
    
    await Comment.findOneAndUpdate({ "_id": cGroupSquence }, { "pComment": null });
    await mongoose.disconnect();

};


module.exports = { deleteC };