import type { Event, EventInput } from "../types";

const BASE = "/api/events";

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

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("club_poisson_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function listEvents(all = false): Promise<Event[]> {
  const url = all ? `${BASE}?all=true` : BASE;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch events");
  const data = await parseJsonSafe<Event[]>(res);
  if (!data) throw new Error("Invalid server response");
  return data;
}

export async function getEvent(id: number): Promise<Event> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch event");
  const data = await parseJsonSafe<Event>(res);
  if (!data) throw new Error("Invalid server response");
  return data;
}

export async function createEvent(input: EventInput): Promise<Event> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to create event");
  const data = await parseJsonSafe<Event>(res);
  if (!data) throw new Error("Invalid server response");
  return data;
}

export async function updateEvent(
  id: number,
  input: EventInput,
): Promise<Event> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to update event");
  const data = await parseJsonSafe<Event>(res);
  if (!data) throw new Error("Invalid server response");
  return data;
}

export async function deleteEvent(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete event");
}
