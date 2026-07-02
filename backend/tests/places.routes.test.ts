import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "../src/app.js";

vi.mock("../src/db/index", () => ({
  pool: {
    query: vi.fn().mockResolvedValue({
      rows: [],
    }),
  },
}));

describe("GET /places", () => {
  it("returns 200", async () => {
    const res = await request(app).get("/places");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});