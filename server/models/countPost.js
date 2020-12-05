const mongoose = require('mongoose');
const config = require("../config/dev");

const CounterSchema = mongoose.Schema({
    seq: {
        type: Number,
        default: 0
    }
})

const Counter = mongoose.model('Counter', CounterSchema)

// mydb.collection('Todos').findOneAndUpdate({_id: new ObjectID("5a71e6165d51bc405882f5e9")}, {$inc: {quantity: 2, "order":1}}, {returnOriginal: false}).then((result) => 
//     {console.log(result);
// })

const getNextSequence = async () => {

    let ret = 0;

    await Counter.findOneAndUpdate(
        {_id: "5fc8ca5b9cecc4ac6f12b651"},
        { $inc: {seq: 1} },
        {new : true},
        (err, doc) => {
            if (err) {
                console.log("findOneAndUpdatefindOneAndUpdate")
            } else {   
                console.log(doc);
                ret = doc.seq;
            }
        }
    )

    // mongoose.connect(config.mongoURI, config.options);

    // await mongoose.disconnect();
    return ret;
};

module.exports = { getNextSequence }