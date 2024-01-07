import { octokit } from "$lib/scripts/octokit";
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request }) => {
    await octokit.request('GET /users/{username}/repos', {
        username: 'Qinbeans',
        headers: {
        'X-GitHub-Api-Version': '2022-11-28'
        },
        per_page: 1,
        page: 1,
        sort: 'updated',
    })
    return json({"status":"success"});
};