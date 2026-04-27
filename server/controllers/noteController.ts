import Note from "../models/Note";
import {createError }from "../utils/createError";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";

interface CreateNoteBody {
    projectId: string;
    content: string;
}
 const createNote = asyncHandler(async (req: Request<{},{},CreateNoteBody>,
     res: Response, next: NextFunction): Promise<void> => {
   
        const { projectId, content } = req.body;

        if (!projectId || !content) {
            return next(createError("ProjectId and content are required", 400));
        }

        const note = await Note.create({ projectId, content });
        res.status(201).json(note);
   
});


 const getNotesByProject = asyncHandler(async (req: Request<{projectId:string},{},{}>,
     res: Response,
      next: NextFunction): Promise<void> => {
        const { projectId } = req.params;
        const notes = await Note.find({ projectId }).sort({ createdAt: -1 });
       
        res.json(notes);
});


 const deleteNote = asyncHandler(async (req: Request<{id:string},{},{}>
    , res: Response
    , next: NextFunction): Promise<void> => {
   
        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id);

        if (!note) {
            return next(createError("Note not found", 404));
        }

        res.json({ message: "Note deleted successfully" });

});
const updateNote = asyncHandler(async (req: Request<{id:string},{},Partial<CreateNoteBody> & {content?:string}>,
    res: Response
    , next: NextFunction): Promise<void> => {
        const { id } = req.params;
        const updates = req.body;

        if (Object.keys(updates).length === 0) {
            return next(createError("No updates provided", 400));
        }

        const note = await Note.findByIdAndUpdate(id, updates, { new: true });

        if (!note) {
            return next(createError("Note not found", 404));
        }

        res.json(note);
});

export {
    createNote,
    getNotesByProject,
    deleteNote,
    updateNote  
};
