const User = require('../../../models/User');

const save = async ({ id, email, password }) => {

    const user = new User({ id, email, password, role: 0, avatar: null });
    await user.save();
    
};

module.exports = { save };
