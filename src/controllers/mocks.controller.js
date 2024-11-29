import MockingService from "../services/mocking.js";
import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";

const getMascotas = async (req,res)=>{
    const mascotas = await MockingService.generateMockingMascotas(100);
    res.send({status:"success", payload: mascotas });
}

const getUsuarios= async (req,res)=>{
    const usuarios = await MockingService.generateMockingUsuarios(50);
    res.send({status:"success", payload: usuarios });
}

const generateData = async (req, res) => {
        try {
            const { users = 10, pets = 10 } = req.body; // Valores predeterminados
            const { usuariosMock, mascotasMock } = await MockingService.generateData(users, pets);
    
            // Insertar en la base de datos
            const insertedUsers = await userModel.insertMany(usuariosMock);
            const insertedPets = await petModel.insertMany(mascotasMock);
    
            res.status(201).json({
                status: "success",
                message: "Datos generados e insertados con éxito.",
                insertedUsers: insertedUsers.length,
                insertedPets: insertedPets.length,
            });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }


};

export default {
    getMascotas,
    getUsuarios,
    generateData
}