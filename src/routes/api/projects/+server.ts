import { octokit } from "$lib/scripts/octokit";
import type { ProjectData } from "$lib/scripts/types.js";
import { compileMarkdown, streamlineGithub } from "$lib/scripts/utils.js";
import { json } from "@sveltejs/kit";

const getReadme = async (project: ProjectData) => {
    try {
        const res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: 'Qinbeans',
            repo: project.name,
            path: 'README.md',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        project.readme.full = atob((res.data as any).content)
    } catch (error) {
        // try lowercase
        try {
            const res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: 'Qinbeans',
                repo: project.name,
                path: 'readme.md',
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            project.readme.full = atob((res.data as any).content)
        } catch (error) {
            return project
        }
    }
    project.readme.short = project.readme.full.split('\n').slice(0, 5).join('\n') + "\n..."
    project.readme.full = await compileMarkdown(project.readme.full, project.author, project.name)
    project.readme.short = await compileMarkdown(project.readme.short, project.author, project.name)
    return project
}

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
    const page = url.searchParams.get('page')?parseInt(url.searchParams.get('page')!,10):1
    const per_page = url.searchParams.get('per_page')?parseInt(url.searchParams.get('per_page')!,10):10
    const res = await octokit.request('GET /users/{username}/repos', {
        username: 'Qinbeans',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
        per_page,
        page,
        sort: 'updated',
    })
    const data = streamlineGithub(res.data);
    for (let i = 0; i < data.length; i++) {
        data[i] = await getReadme(data[i])
    }
    return json(data)
}