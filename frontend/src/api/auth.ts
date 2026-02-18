async function parseJsonSafe<T>(res: Response): Promise<T | null> {
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function login(
  password: string,
): Promise<{ token: string } | { error: string }> {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await parseJsonSafe<{ token?: string; error?: string }>(res);

    if (!res.ok) {
      return { error: data?.error ?? "Impossible de se connecter" };
    }

    if (!data?.token) {
      return { error: "Réponse invalide du serveur" };
    }

    return { token: data.token };
  } catch {
    return { error: "Serveur inaccessible" };
  }
}

export async function checkAuth(
  token: string,
): Promise<{ authenticated: boolean }> {
  try {
    const res = await fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await parseJsonSafe<{ authenticated?: boolean }>(res);

    if (!res.ok || !data) {
      return { authenticated: false };
    }

    return { authenticated: Boolean(data.authenticated) };
  } catch {
    return { authenticated: false };
  }
}

export async function logout(token: string): Promise<void> {
  await fetch("/api/auth/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
}
