import { describe, expect, test } from "bun:test";
import { requireAuth } from "../auth/guard";
import { createSession } from "../auth/sessions";

function makeRequest(token?: string) {
  const headers: HeadersInit = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return new Request("http://localhost/api/events", { headers });
}

describe("requireAuth", () => {
  test("returns 401 when no token", () => {
    const res = requireAuth(makeRequest());
    expect(res?.status).toBe(401);
  });

  test("returns 401 when token is invalid", () => {
    const res = requireAuth(makeRequest("invalid-token"));
    expect(res?.status).toBe(401);
  });

  test("returns null when token is valid", () => {
    const token = createSession();
    const res = requireAuth(makeRequest(token));
    expect(res).toBeNull();
  });
});
