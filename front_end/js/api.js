const API_URL = 'http://127.0.0.1:3000/api';

function getToken() {
    return localStorage.getItem('token');
}

function setToken(token) {
    localStorage.setItem('token', token);
}

function getUtilizador() {
    return JSON.parse(localStorage.getItem('utilizador'));
}

function setUtilizador(utilizador) {
    localStorage.setItem('utilizador', JSON.stringify(utilizador));
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('utilizador');
    window.location.href = '/pages/index.html';
}

async function apiRequest(endpoint, method = 'GET', body = null, isFormData = false) {
    const headers = {};
    if (!isFormData) headers['Content-Type'] = 'application/json';

    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const options = { method, headers };
    if (body) options.body = isFormData ? body : JSON.stringify(body);

    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) throw new Error(data.erro || 'Erro na API');
    return data;
}