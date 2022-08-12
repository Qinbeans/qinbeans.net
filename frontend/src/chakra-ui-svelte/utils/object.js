export function omit(object, keys) {
    const result = {};
    Object.keys(object).forEach((key) => {
        if (keys.includes(key))
            return;
        result[key] = object[key];
    });
    return result;
}
export function pick(object, keys) {
    const result = {};
    keys.forEach((key) => {
        if (key in object) {
            result[key] = object[key];
        }
    });
    return result;
}
