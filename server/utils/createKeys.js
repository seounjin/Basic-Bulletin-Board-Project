const fs = require("fs").promises;
const { generateKeyPairSync } = require("crypto");


const dirExists = async path => !!(await fs.stat(path).catch(e => false));

const CreateKeys = async() => {

    const keysPath = './keys';

    try {
        const state = await dirExists(keysPath);


        if (!state){
            await fs.mkdir(keysPath, { recursive: true })

            const { publicKey, privateKey } = generateKeyPairSync("rsa", {
               modulusLength: 512,
               publicKeyEncoding: {
                   type: "spki",
                   format: "pem"
               },
               privateKeyEncoding: {
                   type: "pkcs8",
                   format: "pem",
               }
           });

        await fs.writeFile('./keys/private.pem', privateKey);
        await fs.writeFile('./keys/public.pem', publicKey);

       }

    } catch (err){

        if (err.code !== 'EEXIST') throw err
    
    }
    

}
    


module.exports = { CreateKeys };

