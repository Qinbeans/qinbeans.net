import { blogs } from "$lib/scripts/store";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({url}) => {
    const per_page = url.searchParams.get('per_page')?parseInt(url.searchParams.get('per_page')!,10):6
    const origin = url.origin
    return {
        origin,
        per_page
    }
};