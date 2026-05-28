

export const perfilJefe =(req,res)=>{

	const {token,createdAt,updatedAt,__v,...datosPerfil} = req.productionHeader

    res.status(200).json(datosPerfil)
}