const User = require('../../../models/User');

const avatar = async (id, avatar) => {
    
    await User.findOneAndUpdate({ id: id }, {$set:{avatar: avatar }});
};

module.exports = { avatar };