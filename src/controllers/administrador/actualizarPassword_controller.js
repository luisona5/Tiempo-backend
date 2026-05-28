import Administrator from "../../models/administrator.js"

export const actualizarPassword = async (req,res)=>{
  try {
    const administradorBDD = await Administrator.findById(req.administratorHeader._id)
    if(!administradorBDD) 
      return res.status(404).json({msg:`Lo sentimos, no existe el administrador ${id}`})


    const verificarPassword = await administradorBDD.matchPassword(req.body.passwordactual)

    if(!verificarPassword) 
      return res.status(404).json({msg:"Lo sentimos, el password actual no es el correcto"})

    administradorBDD.password = await administradorBDD.encryptPassword(req.body.passwordnuevo)

    await administradorBDD.save()
    res.status(200).json({msg:"Password actualizado correctamente"})
    
    } catch (error) {
    console.error(error)
        res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
    }
}