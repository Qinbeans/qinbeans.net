import { persisted } from "svelte-persisted-store";
import type { ProjectData } from "./types";

const defaultProjects: ProjectData[] = [];

export const projects = persisted("projects", defaultProjects, {
    syncTabs:false,
    storage:"session"
});