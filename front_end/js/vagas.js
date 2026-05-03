import { request } from './api.js';

export async function listarVagas() {
    const data = await request("/vaga");
    console.log(data);
}