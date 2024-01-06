import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({url}) => {
    const origin = url.origin;
    return {
        origin,
    }
};