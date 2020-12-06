const User = require('../../../models/User');

const tokenSerch = async token => {

    const user =await User.findOne({ token:token });

    return user;
};

module.exports = { tokenSerch };
