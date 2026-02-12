import { describe, expect, test } from "bun:test";
import { handleEventRoutes } from "../events/routes";
import { createSession } from "../auth/sessions";

function jsonRequest(url: string, method: string, body: unknown, token?: string) {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return new Request(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });
}

describe("event routes validation", () => {
  test("POST /api/events requires auth", async () => {
    const req = jsonRequest("http://localhost/api/events", "POST", {
      title: "Test",
      date: new Date().toISOString(),
    });
    const res = await handleEventRoutes(req, new URL(req.url));
    expect(res?.status).toBe(401);
  });

  test("POST /api/events requires title and date", async () => {
    const token = createSession();
    const req = jsonRequest("http://localhost/api/events", "POST", { title: "" }, token);
    const res = await handleEventRoutes(req, new URL(req.url));
    expect(res?.status).toBe(400);
    const data = (await res!.json()) as { error: string };
    expect(data.error).toBe("title and date are required");
  });

  test("PUT /api/events/:id requires title and date", async () => {
    const token = createSession();
    const req = jsonRequest("http://localhost/api/events/1", "PUT", { date: "" }, token);
    const res = await handleEventRoutes(req, new URL(req.url));
    expect(res?.status).toBe(400);
    const data = (await res!.json()) as { error: string };
    expect(data.error).toBe("title and date are required");
  });
});
