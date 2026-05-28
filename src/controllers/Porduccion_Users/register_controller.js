import ProductionUser from "../../models/production_user.js";
import { capitalize, validarNombre, validarApellido, validarCedula, validarTelefono } from "../../helpers/validation.js";
import { subirBase64Cloudinary, subirImagenCloudinary } from "../../helpers/uploadCloudinary.js";

export const registrarUser = async (req, res) => {
  try {
      const { cedula, telefono, nombre1, apellido1, nombre2, apellido2 } = req.body;
  
      if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Debes llenar todos los campos" });
      }
  
      const datosExistente = await ProductionUser.findOne({ cedula: cedula });
  
      if (datosExistente) {
        if (datosExistente.status === "Inactivo") {
          return res.status(409).json({
            msg: "El usuario se encuentra en estado Inactivo. Por favor, actívalo desde la gestión de jefes.",
          });
        } else {
          return res.status(400).json({
            msg: "El usuario se encuentra registrado y está activo",
          });
        }
      }
  
      
  
      // Validaciones - guardamos los valores capitalizados en variables locales
      const validacionNombre1 = validarNombre(nombre1);
      if (validacionNombre1 !== true) return res.status(400).json({ msg: validacionNombre1 });
      const nombre1Capitalizado = capitalize(nombre1);
  
      let nombre2Capitalizado = "";
      if (nombre2) {
        const validacionNombre2 = validarNombre(nombre2);
        if (validacionNombre2 !== true) return res.status(400).json({ msg: validacionNombre2 });
        nombre2Capitalizado = capitalize(nombre2);
      }
  
      const validacionApellido1 = validarApellido(apellido1);
      if (validacionApellido1 !== true) return res.status(400).json({ msg: validacionApellido1 });
      const apellido1Capitalizado = capitalize(apellido1);
  
      let apellido2Capitalizado = "";
      if (apellido2) {
        const validacionApellido2 = validarApellido(apellido2);
        if (validacionApellido2 !== true) return res.status(400).json({ msg: validacionApellido2 });
        apellido2Capitalizado = capitalize(apellido2);
      }
  
      const validacionCedula = validarCedula(cedula);
      if (validacionCedula !== true) return res.status(400).json({ msg: validacionCedula });
  
      const validacionTelefono = validarTelefono(telefono);
      if (validacionTelefono !== true) return res.status(400).json({ msg: validacionTelefono });
  
      // Ahora sí armamos el objeto con los valores ya validados y capitalizados
      const formato = {
        cedula,
        telefono,
        nombre1: nombre1Capitalizado,
        nombre2: nombre2Capitalizado,
        apellido1: apellido1Capitalizado,
        apellido2: apellido2Capitalizado,
        status: "Activo",
      };
    
      const nuevoProductionUser = new ProductionUser({
        ...formato,
        production: req.productionHeader?._id || null,
      });
  
      if (req.files?.imagen) {
              const { secure_url, public_id } = await subirImagenCloudinary(req.files.imagen.tempFilePath)
              nuevoProductionUser.Imagen = secure_url
              nuevoProductionUser.ImagenID = public_id
          }
      
  
      if (req.body?.avatarIA) {
              const secure_url = await subirBase64Cloudinary(req.body.avatarIA)
              nuevoProductionUser.avatarIA = secure_url
          }
          
      await nuevoProductionUser.save();
  
      return res.status(201).json({ msg: ` Se registro con exitoso a ${nuevoProductionUser.nombre1} ${nuevoProductionUser.apellido1}` });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: `❌ Error en el servidor - ${error.message}` });
    }
  };