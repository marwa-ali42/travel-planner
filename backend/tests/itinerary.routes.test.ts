import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../src/app.js";

describe("POST /itinerary/generate", () => {
  it("returns 400 when city is missing", async () => {
    const res = await request(app)
      .post("/itinerary/generate")
      .send({
        interests: [],
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("City is required");
  });

  it("returns 400 when interests is not an array", async () => {
    const res = await request(app)
      .post("/itinerary/generate")
      .send({
        city: "London",
        interests: "museum",
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Interests must be an array");
  });
});