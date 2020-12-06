const User = require('../../../models/User');

const tokenDelete = async id => {
    
    await User.findOneAndUpdate({ _id: id }, { token: "" });

};


module.exports = { tokenDelete };
