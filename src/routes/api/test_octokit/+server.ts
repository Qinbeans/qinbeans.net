import { App } from "octokit";
import { PUBLIC_OCTOKIT, PUBLIC_OCTOKEY, PUBLIC_OCTOIID } from "$env/static/public"
import { json } from "@sveltejs/kit";


/** @type {import('./$types').RequestHandler} */
export const GET = async () => {
    const envToKey = (env: string) => {
        return env.replaceAll("<nl>", "\n");
    }
    
    const app = new App({
        appId: PUBLIC_OCTOKIT,
        privateKey: envToKey(PUBLIC_OCTOKEY),
    });
    await app.getInstallationOctokit(parseInt(PUBLIC_OCTOIID,10));
    return json({"status":"success"});
};