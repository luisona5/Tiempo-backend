
import mongoose from "mongoose"
import Administrator from "../../models/administrator.js"
import { capitalize, validarNombre, validarApellido,validarCedula,validarTelefono } from "../../helpers/validation.js"

export const actualizarPerfil = async (req,res)=>{

try {
    const {id} = req.params
    const {nombre,apellido,cedula,telefono,email} = req.body

    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(400).json({msg:`ID inválido: ${id}`})

    const administradorBDD = await Administrator.findById(id)

    if(!administradorBDD) 
        return res.status(404).json({ msg: `No existe el administrador ${id}` })
            
        // Actualizar campos solo si se proporcionan
        if (nombre) {
            const validacionNombre = validarNombre(nombre)
            if (validacionNombre !== true) {
                return res.status(400).json({ msg: validacionNombre })
            }
            administradorBDD.nombre = capitalize(nombre)
            
        }  

        if (apellido) {
            const validacionApellido = validarApellido(apellido)
            if (validacionApellido !== true) {
                return res.status(400).json({ msg: validacionApellido })
            }
            administradorBDD.apellido = capitalize(apellido)
        }

        if (cedula) {
            const validacionCedula = validarCedula(cedula)
            if (validacionCedula !== true) {
                return res.status(400).json({ msg: validacionCedula })
            }
            administradorBDD.cedula = cedula
        }

        if (telefono) {
            const validacionTelefono = validarTelefono(telefono)
            if (validacionTelefono !== true) {
                return res.status(400).json({ msg: validacionTelefono })
            }
            administradorBDD.telefono = telefono
        }
        
        if (email) administradorBDD.email = email;


        await administradorBDD.save()

        res.status(200).json(administradorBDD)

  } catch (error) {
  console.error(error)
  res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
  }
}