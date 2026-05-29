import tiempo from "../../models/produccion_tabla.js";

const obtenerFechaEcuador = () => {
    const opciones = { 
        timeZone: 'America/Guayaquil', 
        year: 'numeric', month: 'numeric', day: 'numeric', 
        hour: 'numeric', minute: 'numeric', second: 'numeric', 
        hour12: false 
    };
    const formatter = new Intl.DateTimeFormat('en-US', opciones);
    const partes = formatter.formatToParts(new Date());
    
    const d = {};
    partes.forEach(({ type, value }) => d[type] = value);
    
    return new Date(d.year, d.month - 1, d.day, d.hour, d.minute, d.second);
};


export const registrarTiempo = async (req, res) => {
    try {
        const { detalle, fecha, horaInicio, horaFin, operacion, tiempoEstandar, cantidad, productionId } = req.body;

        // 1. Validar campos vacíos
        if (!detalle || !fecha || !horaInicio || !horaFin || !operacion || !tiempoEstandar || !cantidad) {
            return res.status(400).json({ msg: "Debes llenar todos los campos" });
        }

        // 2. Parsear fecha
        const [y, m, d] = fecha.split("-").map(Number);
        const fechaDate = new Date(y, m - 1, d);
        fechaDate.setHours(0, 0, 0, 0);

        // 3. Hora actual Ecuador
        const ahoraEcuador = obtenerFechaEcuador();
        const hoyEcuador = new Date(ahoraEcuador);
        hoyEcuador.setHours(0, 0, 0, 0);

        // 4. Parsear horas inicio y fin
        const [hiH, hiM] = horaInicio.split(":").map(Number);
        const [hfH, hfM] = horaFin.split(":").map(Number);
        const minutosInicio   = hiH * 60 + hiM;
        const minutosFin      = hfH * 60 + hfM;
        const minutosActuales = ahoraEcuador.getHours() * 60 + ahoraEcuador.getMinutes();

        // 5. Validar horaFin > horaInicio
        if (minutosFin <= minutosInicio) {
            return res.status(400).json({ msg: "La hora de fin debe ser mayor que la hora de inicio" });
        }

        // 6. Validar que horaInicio no haya pasado (solo si la fecha es hoy)
        if (fechaDate.getTime() === hoyEcuador.getTime() && minutosInicio < minutosActuales) {
            const horaActualStr = `${ahoraEcuador.getHours().toString().padStart(2, '0')}:${ahoraEcuador.getMinutes().toString().padStart(2, '0')}`;
            return res.status(400).json({ 
                msg: `La hora de inicio (${horaInicio}) ya pasó. Hora actual en Ecuador: ${horaActualStr}` 
            });
        }

        // 7. Calcular diferencia en minutos
        const diferenciaTiempo = minutosFin - minutosInicio;

        // 8. Crear y guardar el registro
        const nuevoTiempo = new tiempo({
            detalle,
            fecha,
            horaInicio,
            horaFin,
            operacion,
            tiempoEstandar: Number(tiempoEstandar),
            cantidad: Number(cantidad),
            diferenciaTiempo,
            production: productionId || null,
            productionUser: req.productionUserHeader?._id || null
        });

        const tiempoGuardado = await nuevoTiempo.save();
        return res.status(201).json({ msg: "Tiempo registrado exitosamente", data: tiempoGuardado });

    } catch (error) {
        return res.status(500).json({ msg: `Error en el servidor: ${error.message}` });
    }
};