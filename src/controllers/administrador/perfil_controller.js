

export const perfil =(req,res)=>{

	const {token,createdAt,updatedAt,__v,...datosPerfil} = req.administratorHeader

    res.status(200).json(datosPerfil)
}