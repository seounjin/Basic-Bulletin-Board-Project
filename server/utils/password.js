const fs = require('fs');
const crypto = require("crypto");


const comparePassword = async(passwordA, passwordB) => {
    
    const privateKey = await fs.promises.readFile('./keys/private.pem', 'utf8');

    const userPassword = crypto.privateDecrypt(privateKey, Buffer.from(passwordA, "base64")).toString('utf8');

    const dbPassword = crypto.privateDecrypt(privateKey, Buffer.from(passwordB, "base64")).toString('utf8');
         
    if (dbPassword !== userPassword){
        return false;
    }

    return true;
};

module.exports = { comparePassword };
