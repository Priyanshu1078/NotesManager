const mongoose=require('mongoose');

const noteSchema=mongoose.Schema({
    content: {
        type:String,
        required:true,
        minLength:4,
    },
    subject: {
        type:String,
        required:true,
    },
})

const note=mongoose.model("note",noteSchema);
module.exports=note;