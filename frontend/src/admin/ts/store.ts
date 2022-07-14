import { writable } from 'svelte/store';
import { AdminUser, AdminState } from './types';

export const admin = writable(AdminState.NONE);
export const token = writable("");
export const user = writable<AdminUser>({
    creds: {
        username: "",
        token: ""//backend token
    },
    conn: null
});