const request = require("supertest");
const app = require("../src/app");

describe("GET /concerts", () => {
  it("should return 200", async () => {
    const res = await request(app).get("/concerts");
    expect(res.statusCode).toBe(200);
  });
});