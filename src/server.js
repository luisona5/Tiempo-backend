// Requerir módulos
import express from 'express'
import cors from 'cors';
import './config/config.js'
import administradorRouter from './routers/Administrator_routes.js'
import routerForgot from './routers/Forgot_routes.js';
import routerProduction from './routers/Production_routes.js';

// para la carga de imagenes 
import fileUpload from "express-fileupload"

// Inicializaciones
const app = express()


// Middlewares 
app.use(express.json())
app.use(cors())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}))



// Variables globales
app.set('port',process.env.PORT || 3000)


// Rutas 
app.get('/',(req,res)=> res.send("Server on"))

app.use('/api', administradorRouter)

app.use('/api',routerForgot)

app.use('/api',routerProduction)





// Exportar la instancia de express por medio de app
export default  app