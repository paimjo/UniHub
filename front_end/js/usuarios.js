import { request } from './api.js';

export async function listarUsuarios() {
    const data = await request("/utilizador");
    console.log(data);
}