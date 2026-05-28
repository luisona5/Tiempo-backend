import producction from "../../models/producction.js";
import { crearTokenJWT } from "../../middlewares/JWT.js";

export const loginJefe = async(req,res)=>{

    try {
        const {email:email,password:password} = req.body
        if (Object.values(req.body).includes("")) 
          return res.status(404).json({msg:"Debes llenar todos los campos"})

        const productionBDD = await producction.findOne({email})

        if(!productionBDD)
           return res.status(404).json({msg:"Usuario o contraseña incorrecta"})

        if(productionBDD.status === false || productionBDD.status === "Inactivo")
        return res.status(403).json({msg: "Tu cuenta está inactiva. Por favor contacta al administrador."})

        const verificarPassword = await productionBDD.matchPassword(password)

        if(!verificarPassword) 
          return res.status(404).json({msg:"Usuario o contraseña incorrecta"})
        const token = crearTokenJWT(productionBDD._id,productionBDD.rol)

        const {_id,rol} = productionBDD

      
        res.status(200).json({
            rol,
            _id,
            token
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
    }
}