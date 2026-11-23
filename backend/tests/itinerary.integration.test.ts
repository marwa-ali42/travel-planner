import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("POST /itinerary/generate (integration)", () => {
  it("returns a valid itinerary for London", async () => {
    const res = await request(app)
      .post("/itinerary/generate")
      .send({
        city: "London",
        startTime: "09:00",
        endTime: "18:00",
        interests: ["food", "museum"],
      });

    expect(res.status).toBe(200);
    expect(res.body.itinerary).toBeDefined();
    expect(Array.isArray(res.body.itinerary)).toBe(true);
    expect(res.body.itinerary.length).toBeGreaterThan(0);

    const first = res.body.itinerary[0];

    expect(first).toHaveProperty("place");
    expect(first).toHaveProperty("start");
    expect(first).toHaveProperty("end");
    expect(first).toHaveProperty("category");
  });

  it("returns 404 for unknown city", async () => {
    const res = await request(app)
      .post("/itinerary/generate")
      .send({
        city: "Unknown City",
        startTime: "09:00",
        endTime: "18:00",
        interests: [],
      });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("No places found for this city");
  });

});