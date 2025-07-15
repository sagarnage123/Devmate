const Note=require("../models/Note");
const {asyncHandler}=require("../utils/asyncHandler");
const {createError}=require("../utils/createError");


const createNote=asyncHandler(async (req,res,next)=>{

    const {title,content}=req.body;

    if(!title || !content)
        return next(createError("Title and Content are required",400));

    const note=await Note.create({
        user:req.user._id,
        title:title,
        content:content
    });

    return res.status(200).json(note);

    next();
});

const getUserNotes=asyncHandler(async (req,res,next)=>{

    const notes=await Note.find({user:req.user._id}).sort({updatedAt:-1});
    console.log(notes);
    
    return res.status(200).json({notes});

});

const updateNote=asyncHandler(async (req,res,next)=>{

    
    const note=await Note.findById(req.params.id);

    if(!note)
        return next(createError("Note don't exists",404));

    if(note.user.toString()!==req.user._id.toString())
        return next(createError("Non authenticated user update",404));

    const {title,content}=req.body;
    if(title)
        note.title=title;

    if(content)
        note.content=content;

    await note.save();

    res.status(200).json(note);

   
});

const deleteNote=asyncHandler(async (req,res,next)=>{
    

    const note=await Note.findById(req.params.id);

    if(!note || !note.user)
        return next(createError("Bad request",404));

    if(note.user.toString()!== req.user._id.toString())
        return next(createError("Non authenticated access tried",403));

    await Note.deleteOne({_id:note._id});

    return res.status(200).json({
        message: "Note deleted successfully"});

});

module.exports={createNote,getUserNotes,updateNote,deleteNote};