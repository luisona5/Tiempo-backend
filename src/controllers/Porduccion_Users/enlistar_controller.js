import nuevoProductionUser from "../../models/production_user.js"

export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await nuevoProductionUser.find({ estado: true })
            .select("-createdAt -updatedAt -__v")

        res.status(200).json(usuarios)  

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
    }
}