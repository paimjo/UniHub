import { request } from './api.js';

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = await request("/auth/login", "POST", {
        email,
        password
    });

    console.log(data);
}

window.login = login;