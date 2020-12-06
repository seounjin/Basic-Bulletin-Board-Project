const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: {
        type: String,
        maxlength: 20,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minglength: 100,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
    },
    avatar: String,

});

module.exports = mongoose.model('User', userSchema);

// const save = async ({ id, email, password }) => {

//     // mongoose.connect(config.mongoURI, config.options);
//     const user = new User({ id, email, password, role: 0 });
//     await user.save();
//     // await mongoose.disconnect();
    
// };

// const findUser = async id => {

//     // mongoose.connect(config.mongoURI, config.options);
    
//     const user = await User.findOne({ id:id });
//     // await mongoose.disconnect();

//     return user;
// };

// const findId = async id => {

//     // mongoose.connect(config.mongoURI, config.options);
    
//     const user = await User.findById(id);
//     // await mongoose.disconnect();

//     return user;
// };

// const saveToken = async (id, refreshToken) => {

//     // mongoose.connect(config.mongoURI, config.options);
    
//     const user = await User.findOne({ id:id });
//     user.token = refreshToken;

//     await user.save();
//     // await mongoose.disconnect();

// };

// const tokenDelete = async id => {

//     // mongoose.connect(config.mongoURI, config.options);
    
//     await User.findOneAndUpdate({ _id: id }, { token: "" });
//     // await mongoose.disconnect();

// };

// const tokenSerch = async token => {

//     // mongoose.connect(config.mongoURI, config.options);
    
//     const user =await User.findOne({ token:token });
//     // await mongoose.disconnect();

//     return user;
// };


// module.exports = { save, findUser, saveToken, tokenDelete, tokenSerch, findId};