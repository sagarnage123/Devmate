import { useProjectContext } from "@/context/ProjectContext";

export default function ProjectOverview() {
    const project = useProjectContext();

    return (
        <div className="grid gap-4 md:grid-cols-2">
           
            <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-medium">Description</h3>
                <p className="text-sm text-muted-foreground">
                    {project.description || "No description provided"}
                </p>
            </div>

          
            <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-medium">Timeline</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                        Start:{" "}
                        {new Date(project.startDate).toLocaleDateString()}
                    </p>
                    <p>
                        Due: {new Date(project.dueDate).toLocaleDateString()}
                    </p>
                </div>
            </div>

         
            <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-medium">Status</h3>
                <p className="text-sm text-muted-foreground capitalize">
                    {project.status}
                </p>
            </div>

            
            <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-medium">Budget</h3>
                <p className="text-sm text-muted-foreground">
                    {project.budget ? `₹${project.budget}` : "Not specified"}
                </p>
            </div>
        </div>
    );
}
