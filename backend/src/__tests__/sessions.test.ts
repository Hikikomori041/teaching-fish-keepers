import { describe, expect, test } from "bun:test";
import {
  createSession,
  deleteSession,
  validateSession,
} from "../auth/sessions";

describe("sessions", () => {
  test("createSession returns a valid token", () => {
    const token = createSession();
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(0);
    expect(validateSession(token)).toBe(true);
  });

  test("deleteSession invalidates token", () => {
    const token = createSession();
    expect(validateSession(token)).toBe(true);
    deleteSession(token);
    expect(validateSession(token)).toBe(false);
  });
});
