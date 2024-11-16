const mongoose = require("mongoose");

const ShoesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    brand:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model("ShoesCollection",ShoesSchema);