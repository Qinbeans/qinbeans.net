import { supabase, type Award } from "$lib/scripts/supabase";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const { data, error } = await supabase.from('awards').select('*').order('date', {ascending: false});
    if (error) {
        throw error;
    }
    return {
        awards: data as Award[]
    };
};