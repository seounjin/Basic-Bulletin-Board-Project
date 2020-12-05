const User = require('../models/User');
const { comparePassword } = require('../utils/password');
const jwt = require('jsonwebtoken');

const userState = (req, res) => {

    res.status(200).json({
        id: req.user._id,
        isAdmin: req.user.role === 1 ? true : false,
        isAuth: true,
        email: req.user.email,
        role: req.user.role
    });
};

const registerUser = async(req, res) => {
    
    try {
        const userInfo = req.body;
        const { id, password, email } = userInfo;

        await User.save(userInfo);

        return res.status(200).json( { success: true } );

    } catch (err) {
        console.log("에러",err);
        return res.status(400).json( { success: false, err } );
    }
};


const login = async(req, res) => {
    
    try {

        const userInfo = req.body;
        const { id, password } = userInfo;

        const user = await User.findUser(id);

        if (!user){
            return res.status(400).json( { loginSuccess: false, err } );
        }
        
        const result = await comparePassword(password, user.password);

        if (!result){                
            return res.status(400).json( { loginSuccess: false } );
        }


        // 토큰생성
        const accessToken =  jwt.sign( {data: user._id.toHexString()}, 'secret', { expiresIn: '120m' });
        const refreshToken =  jwt.sign( {data: user._id.toHexString()}, 'example', { expiresIn: '14d' });
        

        await User.saveToken(id, refreshToken);

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



const logout = async(req, res) => {
    
    try {
        const id = req.user._id;

        await User.tokenDelete(id);

        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
           .status(200).send({ success: true })

    } catch (err) {
        console.log("에러",err);
        return res.status(400).json( { success: false, err } );
    }
};


const tokenRequest = async(req, res) => {

    try {
        const refreshToken = req.cookies.refreshToken;

        const result = await User.tokenSerch(refreshToken);

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




module.exports = { registerUser, login, logout, tokenRequest, userState };
