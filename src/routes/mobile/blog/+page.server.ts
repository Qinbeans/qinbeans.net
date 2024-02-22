import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({url}) => {
    // grab from "blogs" table in order of newest to oldest and limit to 5
    const page = url.searchParams.get('page')?parseInt(url.searchParams.get('page')!,10):1
    const per_page = url.searchParams.get('per_page')?parseInt(url.searchParams.get('per_page')!,10):5
    const origin = url.origin
    return {
        origin,
        page,
        per_page
    }
};