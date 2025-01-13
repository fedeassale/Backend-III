import supertest from "supertest";
import { expect } from "chai";
// import chai from "chai"; 

// const expect = chai.expect; 
const requester = supertest("http://localhost:8080"); 

describe("Router de Adopciones", () => {
    describe("GET /api/adoptions", () => {
        it("Me deberia retornar una lista de adopciones", async () => {
            const {status} = await requester.get("/api/adoptions"); 

            expect(status).to.equal(200); 
        })

        it("Me retorna 404 si la ruta no existe", async () => {
            const {status} = await requester.get("/adoptions/noexiste");
            expect(status).to.equal(404); 
        })

        it("Buscamos que me retorne la info de una adopción existente", async () => {
            let aid = "676dd22d44650498d14c0a09"; 

            const {status} = await requester.get(`/api/adoptions/${aid}`); 
            expect(status).to.equal(200); 
        })

        it("Nos deberia retornar 404 si la adopcion no existe", async () => {
            let noExisteAid = "67626d05a3f6fa3a7145f729"; 
            const {status} = await requester.get(`/api/adoptions/${noExisteAid}`); 

            expect(status).to.equal(404);
        })

        it("Vamos a crear una adopción", async () => {
            "/:uid/:pid"

            let uid = "67462251d04c84d293d764d4";
            let pid = "67462251d04c84d293d764e8";

            const {status} = await requester.post(`/api/adoptions/${uid}/${pid}`);

            expect(status).to.equal(200);

        })
        it("Debe retornar un error si el formato del ID no es válido", async () => {
            const invalidUid = "12345";
            const pid = "67462251d04c84d293d764e8";

            const { status, body } = await requester.post(`/api/adoptions/${invalidUid}/${pid}`);
            expect(status).to.equal(400);
            expect(body.error).to.equal("Invalid ID format");
        });

        it("Debe retornar un error si la mascota ya está adoptada", async () => {
            const uid = "67462251d04c84d293d764d4";
            const adoptedPid = "67462251d04c84d293d764e9"; // ID de mascota adoptada

            const { status, body } = await requester.post(`/api/adoptions/${uid}/${adoptedPid}`);
            expect(status).to.equal(400);
            expect(body.error).to.equal("Pet is already adopted");
        });

        it("Debe retornar un error de servidor interno si ocurre una excepción", async () => {
            const uid = "67462251d04c84d293d764d4";
            const pid = "error-for-testing"; // Forzar error en el backend

            const { status, body } = await requester.post(`/api/adoptions/${uid}/${pid}`);
            expect(status).to.equal(500);
            expect(body.error).to.equal("Internal server error");
        });
    })
})