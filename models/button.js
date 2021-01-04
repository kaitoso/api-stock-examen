const mongoose = require("mongoose");


const buttonSchema = new mongoose.Schema({
    status: {
        type: Boolean
    },
    
}
);

module.exports = mongoose.model("Button", buttonSchema);