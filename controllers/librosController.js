// ============================================================
// ARCHIVO: controllers/librosController.js
// CAPA 2: NEGOCIO - Validaciones y lógica de la aplicación
// ============================================================

const LibroModel = require('../models/libroModel');
// Importamos el nuevo servicio
const libroService = require('../services/libroService'); 

/**
 * CONTROLADOR: Listar todos los libros (con filtro opcional)
 * GET /api/libros?titulo=texto
 */
async function listarLibros(req, res) {
    try {
        // 1. Leer req.query.titulo (adaptación lógica de "nombre" para tu entidad)
        const { titulo } = req.query;
        
        let libros;
        
        // 2 y 3. Filtrar si el parámetro está presente y no está vacío
        if (titulo && titulo.trim() !== '') {
            libros = await LibroModel.buscarPorTitulo(titulo.trim());
        } else {
            // Si no viene el parámetro, listar todos
            libros = await LibroModel.obtenerTodos();
        }
        
        // 4. Retornar siempre el formato esperado. 
        // Si el filtro no encuentra nada, 'libros' será [] y total 0. No retorna 404.
        res.status(200).json({
            ok: true,
            total: libros.length,
            datos: libros
        });
        
    } catch (error) {
        console.error('Error en listarLibros:', error.message);
        res.status(500).json({
            ok: false,
            mensaje: 'Error interno del servidor'
        });
    }
}

/**
 * CONTROLADOR: Obtener un libro por ID
 * GET /api/libros/:id
 */
async function obtenerLibro(req, res) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ ok: false, mensaje: 'El ID debe ser un número entero positivo' });
        }
        
        const libro = await LibroModel.obtenerPorId(id);
        if (!libro) {
            return res.status(404).json({ ok: false, mensaje: `No se encontró el libro con ID ${id}` });
        }
        
        res.status(200).json({ ok: true, datos: libro });
    } catch (error) {
        console.error('Error en obtenerLibro:', error.message);
        res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
    }
}

/**
 * CONTROLADOR: Crear un nuevo libro
 * POST /api/libros
 */
async function crearLibro(req, res) {
    try {
        // 1. Validar a través del Service
        const validacion = libroService.validarDatos(req.body);
        if (!validacion.valido) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error de validación',
                error: validacion.error
            });
        }
        
        // 2. Preparar/Limpiar datos
        const datosPreparados = libroService.prepararItem(req.body);
        
        // 3. Crear en BD
        const nuevoLibro = await LibroModel.crear(datosPreparados);
        
        res.status(201).json({
            ok: true,
            mensaje: 'Libro creado exitosamente',
            datos: nuevoLibro
        });
        
    } catch (error) {
        console.error('Error en crearLibro:', error.message);
        res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
    }
}

/**
 * CONTROLADOR: Actualizar un libro existente
 * PUT /api/libros/:id
 */
async function actualizarLibro(req, res) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ ok: false, mensaje: 'El ID debe ser un número entero positivo' });
        }
        
        const libroExistente = await LibroModel.obtenerPorId(id);
        if (!libroExistente) {
            return res.status(404).json({ ok: false, mensaje: `No se encontró el libro con ID ${id}` });
        }
        
        // 1. Validar a través del Service (pasando true para indicar que es actualización)
        const validacion = libroService.validarDatos(req.body, true);
        if (!validacion.valido) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error de validación',
                error: validacion.error
            });
        }
        
        // 2. Preparar/Limpiar datos
        const datosPreparados = libroService.prepararItem(req.body);
        
        // 3. Actualizar
        const actualizado = await LibroModel.actualizar(id, datosPreparados);
        if (!actualizado) {
            return res.status(500).json({ ok: false, mensaje: 'No se pudo actualizar el libro' });
        }
        
        const libroActualizado = await LibroModel.obtenerPorId(id);
        res.status(200).json({
            ok: true,
            mensaje: 'Libro actualizado exitosamente',
            datos: libroActualizado
        });
        
    } catch (error) {
        console.error('Error en actualizarLibro:', error.message);
        res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
    }
}


/**
 * CONTROLADOR: Eliminar un libro
 * DELETE /api/libros/:id
 */
async function eliminarLibro(req, res) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ ok: false, mensaje: 'El ID debe ser un número entero positivo' });
        }
        
        const libroExistente = await LibroModel.obtenerPorId(id);
        if (!libroExistente) {
            return res.status(404).json({ ok: false, mensaje: `No se encontró el libro con ID ${id}` });
        }
        
        const eliminado = await LibroModel.eliminar(id);
        if (!eliminado) {
            return res.status(500).json({ ok: false, mensaje: 'No se pudo eliminar el libro' });
        }
        
        res.status(200).json({ ok: true, mensaje: `Libro "${libroExistente.titulo}" eliminado exitosamente` });
    } catch (error) {
        console.error('Error en eliminarLibro:', error.message);
        res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
    }
}

module.exports = {
    listarLibros,
    obtenerLibro,
    crearLibro,
    actualizarLibro,
    eliminarLibro
};