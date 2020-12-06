

const userState = (req, res) => {

    res.status(200).json({
        id: req.user._id,
        isAdmin: req.user.role === 1 ? true : false,
        isAuth: true,
        email: req.user.email,
        role: req.user.role
    });
};


module.exports = { userState };
