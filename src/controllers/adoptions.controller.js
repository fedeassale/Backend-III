import { adoptionsService, petsService, usersService } from "../services/index.js"

const getAllAdoptions = async(req,res)=>{
    const result = await adoptionsService.getAll();
    res.send({status:"success",payload:result})
}

const getAdoption = async(req,res)=>{
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({_id:adoptionId})
    if(!adoption) return res.status(404).send({status:"error",error:"Adoption not found"})
    res.send({status:"success",payload:adoption})
}


const createAdoption = async (req, res) => {
    const { uid, pid } = req.params;

    try {
        
        if (!uid.match(/^[0-9a-fA-F]{24}$/) || !pid.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({ status: "error", error: "Invalid ID format" });
        }

        const user = await usersService.getUserById(uid);
        if (!user) return res.status(404).send({ status: "error", error: "User not found" });

        const pet = await petsService.getBy({ _id: pid });
        if (!pet) return res.status(404).send({ status: "error", error: "Pet not found" });

        if (pet.adopted) return res.status(400).send({ status: "error", error: "Pet is already adopted" });

        user.pets.push(pet._id);
        await usersService.update(user._id, { pets: user.pets });
        await petsService.update(pet._id, { adopted: true, owner: user._id });
        await adoptionsService.create({ owner: user._id, pet: pet._id });

        res.send({ status: "success", message: "Pet adopted" });
    } catch (error) {
        console.error("Error in createAdoption:", error.message);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};


export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
}
