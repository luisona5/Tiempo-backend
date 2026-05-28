
import mongoose from "mongoose"
import nuevoProductionUser from "../../models/production_user.js"
import { capitalize, validarNombre, validarApellido,validarCedula,validarTelefono } from "../../helpers/validation.js"
import { subirBase64Cloudinary, subirImagenCloudinary } from "../../helpers/uploadCloudinary.js"
import { v2 as cloudinary } from 'cloudinary'

const actualizarDatos = async (req,res)=>{

try {
    const {id} = req.params
    const {nombre1,apellido1,nombre2,apellido2,cedula,telefono} = req.body

    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(400).json({msg:`ID inválido: ${id}`})

    const productionUserBDD = await nuevoProductionUser.findById(id)

    if(!productionUserBDD) 

        return res.status(404).json({ msg: `No existe el usuario de producción ${id}` })

        

        // Actualizar campos solo si se proporcionan
        if (nombre1) {
            const validacionNombre = validarNombre(nombre1)
            if (validacionNombre !== true) {
                return res.status(400).json({ msg: validacionNombre })
            }
            productionUserBDD.nombre1 = capitalize(nombre1)
            
        }  



        if (nombre2) {
            const validacionNombre = validarNombre(nombre2)
            if (validacionNombre !== true) {
                return res.status(400).json({ msg: validacionNombre })
            }
            productionUserBDD.nombre2 = capitalize(nombre2)
            
        } 



        if (apellido1) {
            const validacionApellido = validarApellido(apellido1)
            if (validacionApellido !== true) {
                return res.status(400).json({ msg: validacionApellido })
            }
            productionUserBDD.apellido1 = capitalize(apellido1)
        }



        if (apellido2) {
            const validacionApellido = validarApellido(apellido2)
            if (validacionApellido !== true) {
                return res.status(400).json({ msg: validacionApellido })
            }
            productionUserBDD.apellido2 = capitalize(apellido2)
        }



        if (cedula) {
            const validacionCedula = validarCedula(cedula)
            if (validacionCedula !== true) {
                return res.status(400).json({ msg: validacionCedula })
            }
            productionUserBDD.cedula = cedula
        }


        if (telefono) {
            const validacionTelefono = validarTelefono(telefono)
            if (validacionTelefono !== true) {
                return res.status(400).json({ msg: validacionTelefono })
            }
            productionUserBDD.telefono = telefono
        }


        
        await productionUserBDD.save()

        res.status(200).json(productionUserBDD)

  } catch (error) {
  console.error(error)
  res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
  }
}

const actualizarImagen = async (req,res) => {

    try {
        const {id} = req.params 
        if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(400).json({msg:`ID inválido: ${id}`})

        const productionUserBDD = await nuevoProductionUser.findById(id)  
        if(!productionUserBDD) return res.status(404).json({ msg: `No existe el usuario de producción ${id}` })

        if (req.files?.imagen) {

            if (productionUserBDD.ImagenID) await cloudinary.uploader.destroy(productionUserBDD.ImagenID);
            const { secure_url, public_id } = await subirImagenCloudinary(req.files.imagen.tempFilePath);
            productionUserBDD.Imagen = secure_url;
            productionUserBDD.ImagenID = public_id;
        }

        if (req.body?.avatarIA) {
        const secure_url = await subirBase64Cloudinary(req.body.avatarIA);
        productionUserBDD.avatarIA = secure_url;
        }

        await productionUserBDD.save();
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

        const productionUserBDD = await nuevoProductionUser.findById(id)  
        if(!productionUserBDD) return res.status(404).json({ msg: `No existe el usuario de producción ${id}` })

        if (productionUserBDD.ImagenID) {
            await cloudinary.uploader.destroy(productionUserBDD.ImagenID);
            productionUserBDD.Imagen = null;
            productionUserBDD.ImagenID = null;
        }

        await productionUserBDD.save();
        return res.status(200).json({ msg: "Imagen eliminada correctamente" })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: `❌ Error en el servidor - ${error.message}` })
    }
}

export  {
    actualizarDatos,
    actualizarImagen,
    eliminarImagen
}