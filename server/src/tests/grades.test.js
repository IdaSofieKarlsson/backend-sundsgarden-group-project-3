import request from "supertest";
import app from "../../index.js";

describe("Grades API", () => {
  it("should reject unauthenticated request", async () => {
    const res = await request(app).get("/api/grades/me");
    expect(res.status).toBe(401);
  });
});
