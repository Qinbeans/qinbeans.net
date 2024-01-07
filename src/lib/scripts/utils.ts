/**
 * @param {string} markdown
 * @param {string} lines
 * @returns {string}
 * @description Trims the markdown string to the specified number of lines
 **/
export const streamlineMarkdown = (markdown: string, lines: number) => {
    const numberOfLines = markdown.split('\n').length;
    if (numberOfLines > lines) {
        return markdown.split('\n').slice(0, lines).join('\n');
    }
    return markdown;
}

/**
 * @param {string} email
 * @returns {boolean}
 * @description Checks if the email is valid
 **/
export const isEmailValid = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}

/**
 * @param {[]} raw_github
 * @returns {ProjectData[]}
 * @description Converts the raw github response into a streamlined interface
 **/
export const streamlineGithub = (raw_github: any) => {
    return raw_github.map((project: any) => {
        return {
            visibility: project.visibility,
            author: project.owner.login,
            name: project.name,
            url: project.html_url,
            created_at: (new Date(project.created_at)).toLocaleDateString(),
            updated_at: (new Date(project.updated_at)).toLocaleDateString(),
            language: project.language,
            readme: {
                full: "",
                short: "",
            },
            forked: project.fork,
        }
    })
}

/**
 * @param {string} markdown
 * @param {string} author
 * @param {string} name
 * @returns {string}
 * @description checks if the markdown contains an image tag and if it does, it replaces the relative path with the absolute path
 **/
export const replaceRelativePathsWithAbsolute = (markdown: string, author: string, name: string) => {
    const img_regex = /<img src="(.*)"/g;
    const bracket_regex = /!\[(.*)\]\((.*)\)/g;
    const matches = markdown.match(img_regex);
    matches?.push(...(markdown.match(bracket_regex) || []));
    if (!matches) return markdown;
    matches.forEach((match) => {
        const relativePath = match.split('"')[1];
        const absolutePath = `https://raw.githubusercontent.com/${author}/${name}/main/${relativePath}`;
        markdown = markdown.replace(relativePath, absolutePath);
    })
    return markdown;
}