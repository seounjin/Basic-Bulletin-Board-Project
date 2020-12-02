const fs = require('fs');


const publicKey = (req, res) => {

    fs.readFile('./keys/public.pem', 'utf8', (err, key) => {

        if (err) return res.status(400).json({ success: false, err });

        return res.status(200).json({ success: true, key });
    });

};


module.exports = { publicKey };
