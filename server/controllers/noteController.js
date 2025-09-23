const Note=require("../models/Note");


 const createNote = async (req, res) => {
    try {
        const { projectId, content } = req.body;

        if (!projectId || !content) {
            return res.status(400).json({ message: "ProjectId and content are required" });
        }

        const note = await Note.create({ projectId, content });
        res.status(201).json(note);
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Server error" });
    }
};


 const getNotesByProject = async (req, res) => {
    
    try {
        const { projectId } = req.params;
        const notes = await Note.find({ projectId }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Server error" });
    }
};


 const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports={createNote,deleteNote,getNotesByProject};
