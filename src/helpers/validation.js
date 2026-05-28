export const FechaEcuador = () => {
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



// Función para  cada palabra contenga mayuscula al inicio y el resto en minúscula
export const capitalize = (str) => {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};



export const validarNombre = (nombre) => {
    // Esta expresión regular permite letras (con acentos y ñ) y espacios
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (!nombre || nombre.trim().length < 3) {
        return "El nombre es demasiado corto.";
    }

    if (!regex.test(nombre)) {
        return "El nombre solo puede contener letras.";
    }

    return true; // Es válido
};

export const validarApellido = (apellido) => {
    // Esta expresión regular permite letras (con acentos y ñ) y espacios
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (!apellido || apellido.trim().length < 3) {
        return "El apellido es demasiado corto.";
    }

    if (!regex.test(apellido)) {
        return "El apellido solo puede contener letras.";
    }

    return true; // Es válido
};

export const validarTelefono = (telefono) => {
    // Esta expresión regular permite números,
    const regex = /^0\d{9}$/;
    
    if (!telefono || telefono.trim().length < 10) {
        return "El teléfono es demasiado corto.";
    }
    if (!telefono || telefono.trim().length > 10) {
        return "El teléfono debe tener 10 dígitos.";
    }

    if (!regex.test(telefono)) {
        return "El teléfono solo puede contener números.";
    }

    return true; // Es válido
};


export const validarCedula = (cedula) => {
    // Esta expresión regular permite números,
    const regex = /^\d{10}$/;

    if (!cedula || cedula.trim().length < 10) {
        return "La cédula es demasiado corta.";
    }
    if (!cedula || cedula.trim().length > 10) {
        return "La cédula es demasiado larga.";
    }

    if (!regex.test(cedula)) {
        return "La cédula solo puede contener números.";
    }

    return true; // Es válido
};


