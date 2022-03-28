import request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("users", () => {
  beforeAll(async () => {
    const conection = await createConnection();
    await conection.runMigrations();
  });

  it("Deve ser criado um usuario", async () => {
    const response = await request(app).post("/users").send({
      email: "emaildeteste@gmail.com",
      name: "usuario de teste",
    });
    expect(response.status).toBe(201);
  });

  // it("Não é possivel adicionar um usuario com o mesmo email", async () => {
  //   const response = await request(app).post("/users").send({
  //     email: "emaildeteste@gmail.com",
  //     name: "usuario de teste",
  //   });
  //   expect(response.status).toBe(400);
  // });
});
