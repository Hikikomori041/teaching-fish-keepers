import { describe, expect, test } from "bun:test";
import { handleAuthRoutes } from "../auth/routes.ts";

function jsonRequest(url: string, method: string, body: unknown, headers?: HeadersInit) {
  return new Request(url, {
    method,
    headers: { "Content-Type": "application/json", ...(headers ?? {}) },
    body: JSON.stringify(body),
  });
}

describe("auth routes", () => {
  test("login rejects invalid password", async () => {
    const req = jsonRequest("http://localhost/api/auth/login", "POST", {
      password: "wrong",
    });
    const res = await handleAuthRoutes(req, new URL(req.url));
    expect(res?.status).toBe(401);
  });

  test("login creates session and me returns authenticated", async () => {
    const loginReq = jsonRequest("http://localhost/api/auth/login", "POST", {
      password: process.env.ADMIN_PASSWORD || "admin",});
    });
    const loginRes = await handleAuthRoutes(loginReq, new URL(loginReq.url));
    expect(loginRes?.status).toBe(200);
    const loginData = (await loginRes!.json()) as { token: string };
    expect(loginData.token).toBeTruthy();

    const meReq = new Request("http://localhost/api/auth/me", {
      headers: { Authorization: `Bearer ${loginData.token}` },
    });
    const meRes = await handleAuthRoutes(meReq, new URL(meReq.url));
    const meData = (await meRes!.json()) as { authenticated: boolean };
    expect(meData.authenticated).toBe(true);
  });

  test("logout invalidates session", async () => {
    const loginReq = jsonRequest("http://localhost/api/auth/login", "POST", {
      password: "admin",
    });
    const loginRes = await handleAuthRoutes(loginReq, new URL(loginReq.url));
    const loginData = (await loginRes!.json()) as { token: string };

    const logoutReq = new Request("http://localhost/api/auth/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${loginData.token}` },
    });
    const logoutRes = await handleAuthRoutes(logoutReq, new URL(logoutReq.url));
    expect(logoutRes?.status).toBe(200);

    const meReq = new Request("http://localhost/api/auth/me", {
      headers: { Authorization: `Bearer ${loginData.token}` },
    });
    const meRes = await handleAuthRoutes(meReq, new URL(meReq.url));
    const meData = (await meRes!.json()) as { authenticated: boolean };
    expect(meData.authenticated).toBe(false);
  });
});
