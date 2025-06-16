import request from "supertest";
import app from "../src/app.js";

describe("POST /api/v1/auth/signin", () => {
  test("debería responder con un token si las credenciales son válidas", async () => {
    const res = await request(app).post("/api/v1/auth/sign-in").send({
      email: "carlosdanieluniversity@gmail.com",
      password: "1@Ahashedword",
    });

    expect(res.statusCode).toEqual(200);
  });
});
