import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url, request }) => {
    // check if the user is on a mobile device
    if (request.headers.get("user-agent")?.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
        if (url.pathname.includes("/mobile") || url.pathname.includes("/assets") || url.pathname.includes("/api") ) {
            return {
                response: "pass"
            }
        }
        // replace the current URL with the mobile version, which just appends "mobile" after the domain name
        const path = `${url.origin}/mobile${url.pathname}`;
        // redirect to the mobile version
        throw redirect(302, path);
    }
    return {
        response: "pass"
    }
}