import mongoose from "mongoose";
import Users from "../src/dao/Users.dao.js";

//modulo nativo de node que nos permite hacer las validaciones
import  assert  from "assert";

mongoose.connect("mongodb+srv://fedeassale17:fedeassale17@cluster0.nxt6m.mongodb.net/Backend3test?retryWrites=true&w=majority&appName=Cluster0");

describe("testeamos el DAO de usuarios", function(){
    before(function(){
        this.usersDao = new Users();
    })
    beforeEach(async function (){
        await mongoose.connection.collections.users.drop();
    })



    it("el get de usuarios me debe retornar un array", async function(){
        const resultado = await this.usersDao.get();

        assert.strictEqual(Array.isArray(resultado), true);
     })
     it("El DAO debe poder agregar un usuario nuevo a la Base Datos",async function () {
        let usuario = {
            first_name: "Fede",
            last_name: "Assale",
            email: "fede_assale17@hotmail.com",
            password: "1234"
        }

        const resultado = await this.usersDao.save(usuario);
        assert.ok(resultado._id);
        //aca verificamos q el valor es verdadero.
     })
     it("Validamos que el usuario tenga un array de mascotas vacio",async function(){
        let usuario={
            first_name: "tete",
            last_name: "fred",
            email: "fed@hotmail.com",
            password: "1234"
        }
        const resultado = await this.usersDao.save(usuario);
        assert.deepStrictEqual(resultado.pets,[]);
     })

     it("El DAO puede obtener un usuario por email", async function (){
        let usuario={
            first_name: "tete",
            last_name: "fred",
            email: "fed@hotmail.com",
            password: "1234"
        }
        await this.usersDao.save(usuario);
        const user = await this.usersDao.getBy({email:usuario.email});
        assert.strictEqual(typeof user , "object");
     })

     after(async function (){
        await mongoose.disconnect();
     } )
})













//"mongodb+srv://fedeassale17:fedeassale17@cluster0.nxt6m.mongodb.net/Backend3?retryWrites=true&w=majority&appName=Cluster0"


