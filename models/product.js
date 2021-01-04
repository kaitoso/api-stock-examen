const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description:{
        type: String,
        trim: true,
        required: true,
        maxlength: 100,
        
    },
    price:{
        type: Number,
        trim: true,
        required: true,
        maxlength: 32,
        
    },
    quantity: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    modify: {
        type: Date,
        trim: true
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);