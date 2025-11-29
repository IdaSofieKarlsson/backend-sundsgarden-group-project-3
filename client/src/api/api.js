export async function apiFetch(url, method="GET", body=null) {
  const token = localStorage.getItem("token");

  return fetch(`http://localhost:3001${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined
    },
    body: body ? JSON.stringify(body) : null
  }).then(res => res.json());
}
