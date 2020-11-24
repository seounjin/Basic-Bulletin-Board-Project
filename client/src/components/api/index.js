import axios from 'axios';
import crypto from 'crypto';


export const encryptPassword = async password => {

    const response = await axios('/api/user/publickey')

    // 공개키 + Password 암호화
    const encryption = crypto.publicEncrypt(response.data.publicKey, Buffer.from(password)).toString("base64");
    
    return encryption;

  };
