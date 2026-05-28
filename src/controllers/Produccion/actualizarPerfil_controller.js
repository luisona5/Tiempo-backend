
import mongoose from "mongoose"
import producction from "../../models/producction.js"
import { capitalize, validarNombre, validarApellido,validarCedula,validarTelefono } from "../../helpers/validation.js"
import { subirBase64Cloudinary, subirImagenCloudinary } from "../../helpers/uploadCloudinary.js"
import { v2 as cloudinary } from 'cloudinary'

const actualizarPerfilJefe = async (req,res)=>{

try {
    const {id} = req.params
    const {nombre1,apellido1,nombre2,apellido2,cedula,telefono,email} = req.body

    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(400).json({msg:`ID inválido: ${id}`})

    const jefeBDD = await producction.findById(id)

    if(!jefeBDD) 

        return res.status(404).json({ msg: `No existe el jefe ${id}` })

        

        // Actualizar campos solo si se proporcionan
        if (nombre1) {
            const validacionNombre = validarNombre(nombre1)
            if (validacionNombre !== true) {
                return res.status(400).json({ msg: validacionNombre })
            }
            jefeBDD.nombre1 = capitalize(nombre1)
            
        }  



        if (nombre2) {
            const validacionNombre = validarNombre(nombre2)
            if (validacionNombre !== true) {
                return res.status(400).json({ msg: validacionNombre })
            }
            jefeBDD.nombre2 = capitalize(nombre2)
            
        } 



        if (apellido1) {
            const validacionApellido = validarApellido(apellido1)
            if (validacionApellido !== true) {
                return res.status(400).json({ msg: validacionApellido })
            }
            jefeBDD.apellido1 = capitalize(apellido1)
        }



        if (apellido2) {
            const validacionApellido = validarApellido(apellido2)
            if (validacionApellido !== true) {
                return res.status(400).json({ msg: validacionApellido })
            }
            jefeBDD.apellido2 = capitalize(apellido2)
        }



        if (cedula) {
            const validacionCedula = validarCedula(cedula)
            if (validacionCedula !== true) {
                return res.status(400).json({ msg: validacionCedula })
            }
            jefeBDD.cedula = cedula
        }


        if (telefono) {
            const validacionTelefono = validarTelefono(telefono)
            if (validacionTelefono !== true) {
                return res.status(400).json({ msg: validacionTelefono })
            }
            jefeBDD.telefono = telefono
        }


        
        if (email) jefeBDD.email = email;
        await jefeBDD.save()

        res.status(200).json(jefeBDD)

  } catch (error) {
  console.error(error)
  res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
  }
}

const actualizarImagen = async (req,res) => {

    try {
        const {id} = req.params 
        if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(400).json({msg:`ID inválido: ${id}`})

        const jefeBDD = await producction.findById(id)  
        if(!jefeBDD) return res.status(404).json({ msg: `No existe el jefe ${id}` })

        if (req.files?.imagen) {

            if (jefeBDD.ImagenID) await cloudinary.uploader.destroy(jefeBDD.ImagenID);
            const { secure_url, public_id } = await subirImagenCloudinary(req.files.imagen.tempFilePath);
            jefeBDD.Imagen = secure_url;
            jefeBDD.ImagenID = public_id;
        }

        if (req.body?.avatarIA) {
        const secure_url = await subirBase64Cloudinary(req.body.avatarIA);
        jefeBDD.avatarIA = secure_url;
        }

        await jefeBDD.save();
        return res.status(200).json({ msg: "Imagen actualizada correctamente" })




    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: `❌ Error en el servidor - ${error.message}` })
    }
}

const eliminarImagen = async (req,res) => {

    try {
        const {id} = req.params 
        if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(400).json({msg:`ID inválido: ${id}`})

        const jefeBDD = await producction.findById(id)  
        if(!jefeBDD) return res.status(404).json({ msg: `No existe el jefe ${id}` })

        if (jefeBDD.ImagenID) {
            await cloudinary.uploader.destroy(jefeBDD.ImagenID);
            jefeBDD.Imagen = null;
            jefeBDD.ImagenID = null;
        }

        await jefeBDD.save();
        return res.status(200).json({ msg: "Imagen eliminada correctamente" })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: `❌ Error en el servidor - ${error.message}` })
    }
}

export  {
    actualizarPerfilJefe,
    actualizarImagen,
    eliminarImagen
}