
import Administrator from "../../models/administrator.js"
import { crearTokenJWT } from "../../middlewares/JWT.js"

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (Object.values(req.body).includes("")) {
      return res.status(404).json({ msg: "Debes llenar todos los campos" });
    }

    const AdministradorBDD = await Administrator
      .findOne({ email })
      .select("-status -__v -token -updatedAt -createdAt");

    if (!AdministradorBDD) {
      return res.status(404).json({ msg: "Usuario o contraseña es incorrecto" });
    }

    const verificarPassword = await AdministradorBDD.matchPassword(password);

    if (!verificarPassword) {
      return res.status(404).json({ msg: "Usuario o contraseña es incorrecto" });
    }

    const { _id, rol } = AdministradorBDD;
    const token = crearTokenJWT(_id, rol);

    res.status(200).json({
      rol,
      _id,
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `❌ Error en el servidor - ${error}` });
  }
};

