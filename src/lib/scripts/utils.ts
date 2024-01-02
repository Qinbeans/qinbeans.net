
/**
 * @param markdown
 * @param lines
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