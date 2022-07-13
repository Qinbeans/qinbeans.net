import { writable } from 'svelte/store';
import type { AdminUser } from './types';

export const admin = writable(-1);
export const token = writable("");
export const user = writable<AdminUser>({
    creds: {
        username: "",
        token: ""
    },
    conn: null
});