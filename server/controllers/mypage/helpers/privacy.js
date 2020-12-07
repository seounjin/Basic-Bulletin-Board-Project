const User = require('../../../models/User');

const privacy = async (user) => {
    await User.findOneAndUpdate({id : user.id}, { $set: { password: user.password, email: user.email } } )
};

module.exports = { privacy };