const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var currency = mongoose.Types.Currency;

const Schema = mongoose.Schema;
var promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true
    },
    label:{
        type: String,
        default: '',
        required: true 
    },
    price: {
        type: currency,
        min: 0,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;