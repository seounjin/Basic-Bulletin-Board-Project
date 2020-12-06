const User = require('../../../models/User');

const findUser = async id => {

    const user = await User.findOne({ id:id });

    return user;
};

module.exports = { findUser };
