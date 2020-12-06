const User = require('../../../models/User');

const findId = async id => {
    
    const user = await User.findById(id);

    return user;
};

module.exports = { findId };
