import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params, url}) => {
    return {
        project: parseInt(params.slug, 10),
        origin: url.origin,
    };
};