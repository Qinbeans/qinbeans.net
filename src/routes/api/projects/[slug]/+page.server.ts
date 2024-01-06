import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params}) => {
    return {
        project: parseInt(params.slug, 10)
    };
};