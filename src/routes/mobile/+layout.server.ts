import type { LayoutServerLoad } from "../$types";

export const load: LayoutServerLoad = async ({url, params}) => {
    const id = url.searchParams.get("id");
    const listify = url.pathname.split("/").filter((a) => a!='')
    const contentType = (() => {
        if (listify.length == 0) {
            return "home"
        }
        const last = listify[listify.length - 1]
        if (last == "mobile") {
            return "home"
        }
        return last
    })();
    return {
        currentTile: contentType,
        contentID: id,
    }
};