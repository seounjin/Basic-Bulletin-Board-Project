const User = require('../../../models/User');
const fs = require('fs');
const crypto = require("crypto");

const confirm = async (user) => {
    const temp = await User.findOne( { id: user.id } );

    if (temp.length == 0) {
        return 0;
    }

    const privateKey = await fs.promises.readFile('./keys/private.pem', 'utf8');

    const dbPassword = crypto.privateDecrypt(privateKey, Buffer.from(temp.password, "base64")).toString('utf8');

    const userPassword = crypto.privateDecrypt(privateKey, Buffer.from(user.password, "base64")).toString('utf8');

    if (dbPassword !== userPassword){
        return 1;
    }

    return 2;
};

module.exports = { confirm };