import { persisted } from "svelte-persisted-store";
import type { ProjectData } from "./types";
import type { Database } from "./supabase";

const defaultProjects: ProjectData[] = [];
const defaultBlogs: Database["public"]["Tables"]["blogs"]["Row"][] = [];

export const projects = persisted("projects", defaultProjects, {
    syncTabs:false,
    storage:"session"
});

export const blogs = persisted("blogs", defaultBlogs, {
    syncTabs:false,
    storage:"session"
});