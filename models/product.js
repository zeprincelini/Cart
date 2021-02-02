const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const myschema = Schema({
    imgPath: {
        type: String,
        required: true
    },
    title: {
        required: true,
        type: String
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}); 

module.exports = mongoose.model('Product', myschema);