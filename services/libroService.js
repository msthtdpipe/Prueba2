// ============================================================
// ARCHIVO: services/libroService.js
// CAPA 3: SERVICIOS - Validaciones y preparación de datos
// ============================================================

// Expresiones regulares para validaciones movidas desde el controlador
const PATRONES = {
    // Letras, espacios y tildes, mínimo 2 caracteres
    texto: /^[a-zA-ZáéíóúñÑ\s]{2,150}$/,
    // Números entre 1000 y 2026 (años de publicación válidos)
    anio: /^(19[0-9]{2}|20[0-2][0-6])$/,
    // Letras y espacios para género
    genero: /^[a-zA-ZáéíóúñÑ\s]{3,50}$/
};

/**
 * 3. Valida que los datos obligatorios estén presentes y cumplan los formatos
 */
function validarDatos(body, esActualizacion = false) {
    const { titulo, autor, anio_publicacion, genero } = body;
    
    // Si es creación, validar campos obligatorios
    if (!esActualizacion) {
        if (!titulo || titulo.trim() === '') return { valido: false, error: 'El título es obligatorio' };
        if (!autor || autor.trim() === '') return { valido: false, error: 'El autor es obligatorio' };
        if (!anio_publicacion) return { valido: false, error: 'El año de publicación es obligatorio' };
        if (!genero || genero.trim() === '') return { valido: false, error: 'El género es obligatorio' };
    }

    // Validar formatos si los campos vienen incluidos (útil para creación y actualización parcial)
    if (titulo && !PATRONES.texto.test(titulo.trim())) {
        return { valido: false, error: 'El título debe tener entre 2 y 150 caracteres (solo letras y espacios)' };
    }
    if (autor && !PATRONES.texto.test(autor.trim())) {
        return { valido: false, error: 'El autor debe tener entre 2 y 150 caracteres (solo letras y espacios)' };
    }
    if (anio_publicacion && !PATRONES.anio.test(anio_publicacion.toString())) {
        return { valido: false, error: 'El año debe ser entre 1000 y 2026' };
    }
    if (genero && !PATRONES.genero.test(genero.trim())) {
        return { valido: false, error: 'El género debe tener entre 3 y 50 caracteres' };
    }

    return { valido: true };
}

/**
 * 4. Limpia y normaliza los campos antes de enviarlos a la base de datos
 */
function prepararItem(body) {
    const item = {};
    
    if (body.titulo !== undefined) item.titulo = body.titulo.trim();
    if (body.autor !== undefined) item.autor = body.autor.trim();
    if (body.anio_publicacion !== undefined) item.anio_publicacion = parseInt(body.anio_publicacion, 10);
    
    // Normalizamos el género a minúsculas
    if (body.genero !== undefined) item.genero = body.genero.trim().toLowerCase(); 
    
    // Manejo del booleano
    if (body.disponible !== undefined) {
        item.disponible = body.disponible === true || body.disponible === 'true';
    } else if (body.titulo !== undefined) { // Por defecto true al crear
        item.disponible = true;
    }
    
    return item;
}

module.exports = {
    validarDatos,
    prepararItem
};