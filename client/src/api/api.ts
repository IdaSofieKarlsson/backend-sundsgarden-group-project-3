import { auth } from "../firebase.ts";

async function getToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;

  return await user.getIdToken();
}

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getToken();

  // ----- FIXED HEADER NORMALIZATION -----
  const existing = options.headers;

  let headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (existing) {
    // Case 1: Headers object
    if (existing instanceof Headers) {
      existing.forEach((value, key) => {
        headers[key] = value;
      });
    }
    // Case 2: Array of tuples
    else if (Array.isArray(existing)) {
      existing.forEach(([key, value]) => {
        headers[key] = value;
      });
    }
    // Case 3: Record<string,string>
    else {
      headers = { ...headers, ...existing } as Record<string, string>;
    }
  }

  // Add token
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // ----- PERFORM THE REQUEST -----
  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401 || response.status === 403) {
    throw new Error("Not authorized. Please login again.");
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`API Error: ${message}`);
  }

  return response.json();
}
