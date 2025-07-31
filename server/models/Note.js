const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        maxlength: 10000
    },
    tags:{
        type:[String],
        default:[],
    }
},
    {
        timestamps: true
    }
);

const Note=mongoose.model("Note",noteSchema);

module.exports=Note;