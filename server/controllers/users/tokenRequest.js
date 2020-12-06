const { tokenSerch } = require('../users/helpers');
const jwt = require('jsonwebtoken');


const tokenRequest = async(req, res) => {

    try {
        const refreshToken = req.cookies.refreshToken;

        const result = await tokenSerch(refreshToken);

        if (!result){
            console.log("refreshToken이 일치하지 않음");
            return res.status.json( { success: false, err } );
        }

        const decode = await jwt.verify(refreshToken,'example');

        const token =  await jwt.sign( {data: decode.data}, 'secret', { expiresIn: 30 });
        
        return res.cookie("accessToken", token)
                  .status(200).json( { success: true } );


    } catch (err) {
        console.log("토큰 요청 에러",err);
        return res.status(400).json( { success: false, err } );
    }
  
};

module.exports = { tokenRequest };
