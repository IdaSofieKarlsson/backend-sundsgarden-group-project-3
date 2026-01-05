import request from "supertest";
import { app } from "../../app.js";

describe("Grades API", () => {
  it("rejects unauthenticated users", async () => {
    const res = await request(app).get("/api/grades/me");
    expect(res.status).toBe(401);
  });

  it("fails Zod validation", async () => {
    const token = "fake-token";

    const res = await request(app)
      .post("/api/grades")
      .set("Authorization", `Bearer ${token}`)
      .send({ course: "", grade: "A", year: 1 });

    expect(res.status).toBe(401);
  });
});
