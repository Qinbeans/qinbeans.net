import { writable } from 'svelte/store';
import { State, AdminUser, AdminState } from './types';

//client
export const current = writable(State.NONE);
//admin
export const admin = writable(AdminState.NONE);
export const token = writable("");
export const user = writable<AdminUser>({
    creds: {
        username: "",
        token: ""//backend token
    }
});