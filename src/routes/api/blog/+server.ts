import { supabase, type Database } from "$lib/scripts/supabase"
import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async ({url}) => {
    // grab from "blogs" table in order of newest to oldest and limit to 5
    const page = url.searchParams.get('page')?parseInt(url.searchParams.get('page')!,10):1
    const per_page = url.searchParams.get('per_page')?parseInt(url.searchParams.get('per_page')!,10):5
    const start = page*per_page-per_page
    const end = page*per_page-1
    const { data, error} = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
        .range(start, end)
    // PostgreSQL equivalent with LIMIT and OFFSET: SELECT * FROM blogs ORDER BY created_at DESC LIMIT 5 OFFSET 0;
    if (error) {
        return json({"data":"","error": error})
    }
    // change date format
    data.forEach((blog: Database["public"]["Tables"]["blogs"]["Row"]) => {
        blog.created_at = new Date(blog.created_at).toLocaleDateString()
    })
    return json({data, error})
}