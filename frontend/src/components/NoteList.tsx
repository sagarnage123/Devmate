import {Dispatch, SetStateAction } from "react";

export interface Note {
    _id: string;
    content: string;
    projectId: string;
}

interface NoteListProps {
    handelCreateNote: (projectId: string, content: string) => Promise<void>;
    handelDeleteNote: (noteId: string | null) => Promise<void>;
    setContent:Dispatch<SetStateAction<string>>;
    loading: boolean;
    notes: Array<Note>;
    content: string;
    projectId: string;
    noteCreating: boolean;
}

export default function NoteList({
    handelCreateNote,
    handelDeleteNote,
    setContent,
    loading,
    notes,
    content,
    projectId,
    noteCreating
}: NoteListProps) {

    return(
        <div className="border-3 mt-3 pt-3 space-y-3">
            {
                loading ? (<p>⏳ Loading notes...</p>)
                    : (notes || []).length == 0 ? (<p className="text-sm text-gray-500">No notes yet for this project.</p>)
                    :(
                        <ol className="space-y-2">
                            {
                                notes.map(note=>(
                                    <li
                                    key={note._id}
                                     className="p-2 border rounded flex justify-between item-start">
                                        <div className="text-xs text-gray-500">
                                          { note.content || "-"}
                                        </div>

                                        <button onClick={()=>{handelDeleteNote(note._id)}}
                                            className="px-2 py-1 bg-red-500 text-white border rounded">
                                            Delete
                                        </button>
                                    </li>
                                ))
                            }
                        </ol>
                        

                    )


            }
            <div className="mt-2 p-2 border rounded">
                <h4>Add note</h4>

                <input type="textarea" 
                value={content}
                onChange={(e)=>{setContent(e.target.value)}}
                    className="w-full p-2 border rounded mb-2" />

                <div className="flex gap-2">
                    <button onClick={() => handelCreateNote(projectId,content)} disabled={noteCreating} className="px-3 py-1 bg-green-500 text-white rounded" >
                        {noteCreating ? "Creating..." : "Add Note"}
                    </button>
                    <button onClick={() => { setContent("") }} className="px-3 py-1 bg-gray-200 rounded">
                        Reset
                    </button>
                </div>

            </div>

        </div>

    )
}