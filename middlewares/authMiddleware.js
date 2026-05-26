// ============================================================
// ARCHIVO: middlewares/authMiddleware.js
// CAPA: MIDDLEWARES - Interceptores de peticiones
// ============================================================

// 2. Definir la clave dentro del archivo
const API_KEY = 'eval-s12-2026';

/**
 * 3. Middleware para verificar que la petición incluya el API Key correcto
 */
function verificarApiKey(req, res, next) {
    // Leer el header 'x-api-key' (Express convierte los headers a minúsculas automáticamente)
    const apiKeyRecibida = req.headers['x-api-key'];

    // Si no coincide o no existe, bloqueamos la petición con un 401
    if (!apiKeyRecibida || apiKeyRecibida !== API_KEY) {
        return res.status(401).json({ 
            ok: false, 
            error: 'API key inválida o ausente' 
        });
    }

    // Si coincide, permitimos que la petición continúe hacia el controlador
    next();
}

module.exports = { verificarApiKey };