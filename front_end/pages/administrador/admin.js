const API = "http://localhost:3000/admin";

async function loadDashboard() {
  const res = await fetch(`${API}/stats`);
  const data = await res.json();

  document.getElementById("totalUsers").innerText = "Usuários: " + data.users;
  document.getElementById("totalJobs").innerText = "Vagas: " + data.jobs;
  document.getElementById("totalReports").innerText = "Denúncias: " + data.reports;
}

loadDashboard();