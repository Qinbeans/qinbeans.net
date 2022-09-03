import { writable } from 'svelte/store';
import { AdminUser, AdminState, State } from './types';
import type { Client } from './types';


//client
//current contains timestamp of last update
export const current = writable<Client>({
    state: State.NONE
});
//admin
export const admin = writable(AdminState.NONE);
export const token = writable("");
export const user = writable<AdminUser>({
    creds: {
        username: "",
        token: ""//backend token
    }
});