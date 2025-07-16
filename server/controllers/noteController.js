const Note = require("../models/Note");
const { asyncHandler } = require("../utils/asyncHandler");
const { createError } = require("../utils/createError");


const createNote = asyncHandler(async (req, res, next) => {

    const { title, content ,tags} = req.body;

    if (!title || !content)
        return next(createError("Title and Content are required", 400));

    const formatTag=Array.isArray(tags)?tags.map((tag)=>tag.toLowerCase()):
    tags?[tags.toLowerCase()]:[];

    const note = await Note.create({
        user: req.user._id,
        title: title,
        content: content,
        tags:Array.isArray(tags)?tags:[tags]
    });

    return res.status(201).json(note);

});

const getUserNotes = asyncHandler(async (req, res, next) => {

    const keyword = req.query.search ? {
        $or: [
            { title: { $regex: req.query.search, $options: "i" } },
            { content: { $regex: req.query.search, $options: "i" } },
        ]
    } : {};

    const tagFilter=req.query.tag?{tags:req.query.tag}:{};

    const pages = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (pages - 1) * limit;

    const notes = await Note.find({
        user: req.user._id,
        ...keyword,
        ...tagFilter
    }).sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Note.countDocuments({
        user: req.user._id,
        ...keyword,
        ...tagFilter
    });

    return res.status(200).json(
        {
            success: true,
            count: notes.length,
            total:total,
            pages:Math.ceil(total/limit),
            notes
        });

});

const updateNote = asyncHandler(async (req, res, next) => {


    const note = await Note.findById(req.params.id);

    if (!note)
        return next(createError("Note don't exists", 404));

    if (note.user.toString() !== req.user._id.toString())
        return next(createError("Non authenticated user update", 404));

    const { title, content } = req.body;
    if (title)
        note.title = title;

    if (content)
        note.content = content;

    await note.save();

    res.status(200).json(note);


});

const deleteNote = asyncHandler(async (req, res, next) => {


    const note = await Note.findById(req.params.id);

    if (!note || !note.user)
        return next(createError("Bad request", 404));

    if (note.user.toString() !== req.user._id.toString())
        return next(createError("Non authenticated access tried", 403));

    await Note.deleteOne({ _id: note._id });

    return res.status(200).json({
        message: "Note deleted successfully"
    });

});

module.exports = { createNote, getUserNotes, updateNote, deleteNote };