import { App } from "octokit";
import { PUBLIC_OCTOKIT, PUBLIC_OCTOKEY, PUBLIC_OCTOIID } from "$env/static/public"
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request }) => {
    
    const envToKey = (env: string) => {
        return env.replaceAll("<nl>", "\n");
    }
    
    const app = new App({
        appId: PUBLIC_OCTOKIT,
        privateKey: envToKey(PUBLIC_OCTOKEY),
    });
    const octokit = await app.getInstallationOctokit(parseInt(PUBLIC_OCTOIID,10));
    try {
        await octokit.request('GET /users/{username}/repos', {
            username: 'Qinbeans',
            headers: {
            'X-GitHub-Api-Version': '2022-11-28'
            },
            per_page: 1,
            page: 1,
            sort: 'updated',
        })
    } catch (error: any) {
        let ret_val = ""
        if (error.status)
            ret_val = `Status: ${error.status}, `
        if (error.response)
            ret_val += `Response: ${error.response}, `
        if (error.message)
            ret_val += `Message: ${error.message}`
        return json({"error": ret_val})
    }
    return json({"status":"success"});
};