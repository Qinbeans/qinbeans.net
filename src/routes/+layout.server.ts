import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import * as uuid from "uuid";

export const load: LayoutServerLoad = async ({ url, request }) => {
    // check if the user is on a mobile device
    const agent = request.headers.get("user-agent")?request.headers.get("user-agent")!:"";
    if (agent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
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
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("cf-connecting-ip");
    const hash = ip ? uuid.v5(ip+agent, uuid.v5.URL) : uuid.v4();
    // if the user is not on a mobile device, but is on the mobile version of the site, redirect them to the desktop version
    if (url.pathname.includes("/mobile")) {
        const path = `${url.origin}${url.pathname.replace("/mobile", "")}`;
        throw redirect(302, path);
    }
    return {
        response: "pass",
        ignore_checks: url.pathname.includes("/api"),
        unique_pass: hash,
    }
}