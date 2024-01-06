import { App } from "octokit";
import { PUBLIC_OCTOKIT, PUBLIC_OCTOKEY, PUBLIC_OCTOIID } from "$env/static/public"

const envToKey = (env: string) => {
    return env.replaceAll("<nl>", "\n");
}

const app = new App({
    appId: PUBLIC_OCTOKIT,
    privateKey: envToKey(PUBLIC_OCTOKEY),
});

export const octokit = await app.getInstallationOctokit(parseInt(PUBLIC_OCTOIID,10));