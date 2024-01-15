import { persisted } from "svelte-persisted-store";
import type { ProjectData } from "./types";
import type { Blog } from "./supabase";
import type { Writable } from "svelte/store";

const defaultProjects: ProjectData[] = [];
const defaultBlogs: Blog[] = [];

export const projects = persisted("projects", defaultProjects, {
    syncTabs:false,
    storage:"session"
});

export const blogs = persisted("blogs", defaultBlogs, {
    syncTabs:false,
    storage:"session"
});

export const expirtation: Writable<Date | null> = persisted("expiration", null);