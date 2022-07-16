import { writable } from 'svelte/store';
import { State } from './types';

export const current = writable(State.ABOUT);
