const User = require('../../../models/User');

const saveToken = async (id, refreshToken) => {
    
    const user = await User.findOne({ id:id });
    user.token = refreshToken;

    await user.save();
    
};


module.exports = { saveToken };
