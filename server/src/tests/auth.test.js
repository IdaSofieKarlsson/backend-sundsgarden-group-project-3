import request from "supertest";
import app from "../../index.js";

describe("Auth API", () => {
  it("should fail login with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@test.com", password: "wrong" });

    expect(res.status).toBe(401);
  });
});
