import { supabase, type Award } from "$lib/scripts/supabase"
import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async () => {
    const { data, error} = await supabase
        .from('awards')
        .select('*')
        .order('date', { ascending: false })
    if (error) {
        return json({"error": error})
    }
    data.forEach((award: Award) => {
        award.date = new Date(award.date).toLocaleDateString()
    })
    return json({data})
}