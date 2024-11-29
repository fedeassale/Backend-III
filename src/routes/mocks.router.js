import { Router } from "express";
const router = Router();
import mocksController from "../controllers/mocks.controller.js";

//Endpoint para obtener mascotas simuladas
router.get("/mockingpets", mocksController.getMascotas);

//CREAMOS RUTAS PARA OBTENER USUARIOS

router.get("/mockingusers", mocksController.getUsuarios);


router.post("/generateData", mocksController.generateData);


export default router;
