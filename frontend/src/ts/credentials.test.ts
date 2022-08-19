// import { expect, test } from "bun:test";
import { new_credentials, logout } from "./credentials";
import { user, admin, token } from "./store";
import { AdminState } from "./types";

// test("New Credentials", () => {
//     const creds = new_credentials("test", "test");
//     expect(creds.username).toBe("test");
//     expect(creds.token).toBe("test");
// })

// test("logout", () => {
//     logout();
//     admin.subscribe(state => {
//         expect(state).toBe(AdminState.LOGIN);
//     })
//     token.subscribe(state => {
//         expect(state).toBe("");
//     })
//     user.subscribe(state => {
//         expect(state.creds.username).toBe("");
//         expect(state.creds.token).toBe("");
//         expect(state.conn).toBe(null);
//     })
// })