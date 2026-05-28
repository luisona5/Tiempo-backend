import Administrator from "../../models/administrator.js"
import {capitalize} from "../../helpers/validation.js"


export const registro = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validar que email y password no estén vacíos
    if (!email || !password) {
      return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
    }


    // Crear nueva instancia de administrador
    const nuevoAdmin = new Administrator(req.body)
    
    // Capitalizar nombre y apellido
    nuevoAdmin.nombre = capitalize(nuevoAdmin.nombre)
    nuevoAdmin.apellido = capitalize(nuevoAdmin.apellido)


    nuevoAdmin.password = await nuevoAdmin.encryptPassword(password)


    await nuevoAdmin.save()
    res.status(200).json({msg:`Administrador creado `})
    
  } catch (error) {
    res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
  }
}

