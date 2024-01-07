import { octokit } from "$lib/scripts/octokit";
import showdown from 'showdown';
import type { ProjectData } from "$lib/scripts/types.js";
import { streamlineGithub, replaceRelativePathsWithAbsolute } from "$lib/scripts/utils.js";
import { json } from "@sveltejs/kit";

const compileReadmes = (projects: ProjectData[]) => {
    const absoluteMarkdown = projects.map((project) => replaceRelativePathsWithAbsolute(project.readme.full, project.author, project.name));
    const conv = new showdown.Converter();
    const htmls = absoluteMarkdown.map((markdown) => conv.makeHtml(markdown));
    return htmls;
}

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
    return project
}

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
    
    const page = url.searchParams.get('page')?parseInt(url.searchParams.get('page')!,10):1
    const per_page = url.searchParams.get('per_page')?parseInt(url.searchParams.get('per_page')!,10):10
    try {
        const res = await octokit.request('GET /users/{username}/repos', {
            username: 'Qinbeans',
            headers: {
            'X-GitHub-Api-Version': '2022-11-28'
            },
            per_page,
            page,
            sort: 'updated',
        })
        if (res.status !== 200) {
            return json({"error": res})
        }
        const data = streamlineGithub(res.data);
        for (let i = 0; i < data.length; i++) {
            data[i] = await getReadme(data[i])
        }
        let readmes;
        try {
            readmes = compileReadmes(data);
        } catch (error) {
            return json({"error": error})
        }
        for (let i = 0; i < data.length; i++) {
            data[i].readme.full = readmes[i];
        }
        return json(data)
    } catch (_) {
        return json({"error": octokit.log})
    }
}