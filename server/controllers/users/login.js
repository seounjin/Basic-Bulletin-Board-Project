const { findUser, saveToken } = require('../users/helpers');
const { comparePassword } = require('../../utils/password');
const jwt = require('jsonwebtoken');


const login = async(req, res) => {
    
    try {

        const userInfo = req.body;
        const { id, password } = userInfo;

        const user = await findUser(id);

        if (!user){
            return res.json( { loginSuccess: false } );
        }
        
        const result = await comparePassword(password, user.password);

        if (!result){                
            return res.json( { loginSuccess: false } );
        }


        // 토큰생성
        const accessToken =  jwt.sign( {data: user._id.toHexString()}, 'secret', { expiresIn: '120m' });
        const refreshToken =  jwt.sign( {data: user._id.toHexString()}, 'example', { expiresIn: '14d' });
        

        await saveToken(id, refreshToken);

        res.cookie('refreshToken', refreshToken, {
            expires: new Date(Date.now() + 604800),
            secure: false, // https 사용할 때 True
            httpOnly: true,
          });
        res.cookie('accessToken ', accessToken, {
            expires: new Date(Date.now() + 604800),
            secure: false, // https 사용할 때 True
            httpOnly: true,
          })
            .status(200)
            .json({ loginSuccess: true, userId: id });
          


    } catch (err) {
        console.log("login err",err);
        return res.status(400).json( { loginSuccess: false, err } );
    }
};



module.exports = { login };
