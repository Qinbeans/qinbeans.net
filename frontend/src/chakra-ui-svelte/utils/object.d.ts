export declare type Dict<T = unknown> = Record<string, T>;
export declare function omit<T extends Dict, K extends keyof T>(object: T, keys: K[]): Omit<T, K>;
export declare function pick<T extends Dict, K extends keyof T>(object: T, keys: K[]): { [P in K]: T[P]; };
