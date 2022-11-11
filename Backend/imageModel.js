const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    name : { 
        type: String,
        required : true
    },
    img : {
        data : Buffer,
        ContentType: String
    }
})

module.exports = ImageModel = mongoose.model("Image", ImageSchema)