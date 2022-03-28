import request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("surveys", () => {
  beforeAll(async () => {
    const conection = await createConnection();
    await conection.runMigrations();
  });

  it("Deve ser criado uma nova pesquisa", async () => {
    const response = await request(app).post("/surveys").send({
      title: "title exemplo",
      description: "descricao exemplo",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Deve retornar 2 objetos na requisição", async () => {
    const response = await request(app).get("/show");
    console.log(response.body);
    expect(response.body.length).toBe(2);
  });
});
