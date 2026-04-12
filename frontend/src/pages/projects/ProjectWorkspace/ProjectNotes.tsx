import { useProjectContext } from "@/context/ProjectContext";

export default function ProjectNotes() {
    const project = useProjectContext();

    return (
        <div className="space-y-6">

           
            <div className="bg-white border border-slate-200 rounded-xl p-5">
                <input
                    type="text"
                    placeholder="Note title..."
                    className="w-full text-sm outline-none"
                />
            </div>

           
            <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="text-sm text-slate-500">
                    No notes yet
                </p>
            </div>

        </div>
    );
}