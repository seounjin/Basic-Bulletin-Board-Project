const mongoose = require('mongoose');

const CounterSchema = mongoose.Schema({
    total: {
        type: Number,
        default: 0
    },
    kind: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('Counter', CounterSchema);