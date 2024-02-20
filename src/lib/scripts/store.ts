import { persisted } from "svelte-persisted-store";
import type { ProjectData } from "./types";
import type { Blog, Award } from "./supabase";
import type { Writable } from "svelte/store";

const defaultProjects: ProjectData[] = [];
const defaultBlogs: Blog[] = [];
const defaultAwards: Award[] = [];

export const projects = persisted("projects", defaultProjects, {
    syncTabs:false,
    storage:"session"
});

export const blogs = persisted("blogs", defaultBlogs, {
    syncTabs:false,
    storage:"session"
});

export const awards = persisted("awards", defaultAwards, {
    syncTabs:false,
    storage:"session"
});

export const expiration: Writable<Date | null> = persisted("expiration", null);