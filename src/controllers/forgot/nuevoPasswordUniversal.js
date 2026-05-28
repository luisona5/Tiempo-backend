
import Administrator from "../../models/administrator.js";
import Production from "../../models/producction.js";

const nuevoPasswordUniversal = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmpassword } = req.body;

        // Validar campos vacíos
        if (!password || !confirmpassword) {
            return res.status(400).json({ msg: "Debes llenar todos los campos" });
        }

        // Validar que las contraseñas coincidan
        if (password !== confirmpassword) {
            return res.status(400).json({ msg: "Las contraseñas no coinciden" });
        }

        // Validar longitud mínima
        if (password.length < 8) {
            return res.status(400).json({ 
                msg: "La contraseña debe tener al menos 8 caracteres" 
            });
        }

        // Buscar en las 3 tablas
        let usuario = null;
        let tipoUsuario = null;
        let campoPassword = null; 

        

        // Buscar en Administrador
        if (!usuario) {
            usuario = await Administrator.findOne({ token });
            if (usuario) {
                tipoUsuario = 'administrador';
                campoPassword = 'password'; 
            }
        }

        // Buscar en Produccion

        if (!usuario) {
            usuario = await Production.findOne({ token });
            if (usuario) {
                tipoUsuario = 'produccion';
                campoPassword = 'password'; 
            }
        }

        if (!usuario) {
            return res.status(404).json({ 
                msg: "Token inválido o expirado. Solicita un nuevo enlace de recuperación." 
            });
        }

        // Encriptar y guardar nueva contraseña
        const passwordEncriptada = await usuario.encryptPassword(password);
        usuario[campoPassword] = passwordEncriptada; 
        usuario.token = null;
        
        // Si tienen campo cambioPassword, marcarlo como false
        if (usuario.cambioPassword !== undefined) {
            usuario.cambioPassword = false;
        }

        await usuario.save();

        res.status(200).json({ msg: "Contraseña restablecida exitosamente." });

    } catch (error) {
        res.status(500).json({ msg: `❌ Error en el servidor - ${error.message}` });
    }
};

export default nuevoPasswordUniversal;