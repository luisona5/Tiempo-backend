import mongoose,{ Schema, model } from "mongoose";  //organiza y guarda en la base de datos de manera estructurada
import bcrypt from 'bcryptjs'     // para proteger las contraseñas

const productionUserSchema = new Schema({
    nombre1:{
        type:String,
        required:true,
        trim:true
    },
    apellido1:{
        type:String,
        required:true,
        trim:true
    },
    nombre2:{
        type:String,
        required:true,
        trim:true
    },
    apellido2:{
        type:String,
        required:true,
        trim:true
    },
    cedula:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    
    
    telefono:{
        type:String,
        required:true
    },
    
    estado:{
        type:Boolean,
        default:true
    },
    token:{
        type:String,
        default:null
    },
    Imagen:{
        type:String,
        trim:true
    },
    ImagenID:{
        type:String,
        trim:true
    },
    avatarIA:{
        type:String,
        trim:true
    },
    rol:{
        type:String,
        default:"User_Production"
    },
    status: { 
    type: String, 
    enum: ['Activo', 'Inactivo'], 
    default: 'Activo' 
   },

   production:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Production',
    }

},{
    timestamps:true
})

// metodo para cifrar el password

productionUserSchema.methods.encryptPassword = async function(password){
    const salt= await bcrypt.genSalt(10)    // para produccion se debe poner un factor de 12 o 14 
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password es el mismo de la BDD

productionUserSchema.methods.matchPassword= async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response 
}

// Método para crear un token 

productionUserSchema.methods.createToken= function(){
    const tokenGenerado=Math.random().toString(36).slice(2)
    this.token=tokenGenerado
    return tokenGenerado
}


export default model ('ProductionUser',productionUserSchema)