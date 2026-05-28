
import Administrator from "../../models/administrator.js";
import Production from "../../models/producction.js";
import { sendMailToRecoveryPassword } from '../../helpers/RecoveryPassword.js';

const recuperarPasswordUniversal = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ msg: "El correo es obligatorio" });
        }

        let usuario = null;
        let tipoUsuario = null;


        if (!usuario) {
            usuario = await Administrator.findOne({ email: email });
            if (usuario) {
                tipoUsuario = 'administrador';
            }
        }

        if (!usuario) {
            usuario = await Production.findOne({ email: email });
            if (usuario) {
                tipoUsuario = 'produccion';
            }
        }


        if (!usuario) {
            return res.status(404).json({ 
                msg: "No existe una cuenta asociada a este correo electrónico" 
            });
        }

        const token = usuario.createToken();
        usuario.token = token;
        await usuario.save();

        // Enviar email según el tipo de usuario
        if (tipoUsuario === 'administrador') {
            await sendMailToRecoveryPassword(email, token);
        }
        if (tipoUsuario === 'produccion') {
            await sendMailToRecoveryPassword(email, token);
        }

        res.status(200).json({ 
            msg: "Revisa tu correo electrónico para restablecer tu contraseña" 
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ msg: `❌ Error en el servidor - ${error.message}` });
    }
};

export default recuperarPasswordUniversal;