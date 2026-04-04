import { createContext, useContext } from "react";
import { Project } from "@/types/Project";

const ProjectContext = createContext<Project | null>(null);

export function ProjectProvider({
    project,
    children,
}: {
    project: Project;
    children: React.ReactNode;
}) {
    return (
        <ProjectContext.Provider value={project}>
           {children}
        </ProjectContext.Provider>
    );
}

export function useProjectContext() {
    const ctx = useContext(ProjectContext);
    if (!ctx) {
        throw new Error("useProjectContext must be used inside ProjectProvider");
    }
    return ctx;
}
