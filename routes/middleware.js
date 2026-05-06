const { handleError } = require('../utils/helpers');

// Error handling middleware
function errorHandler(err, req, res, next) {
    handleError(err, `Request ${req.method} ${req.url}`);
    
    // Set default error status and message
    let status = 500;
    let message = 'Internal Server Error';
    
    // Handle specific error types
    if (err.name === 'ValidationError') {
        status = 400;
        message = 'Validation Error';
    } else if (err.name === 'CastError') {
        status = 400;
        message = 'Invalid ID format';
    } else if (err.code === 'ENOENT') {
        status = 404;
        message = 'Resource not found';
    }
    
    res.status(status).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
}

// 404 handler
function notFoundHandler(req, res) {
    res.status(404).json({
        error: 'Route not found',
        path: req.path
    });
}

// Request logging middleware
function requestLogger(req, res, next) {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
    });
    
    next();
}

// Security middleware
function securityHeaders(req, res, next) {
    // Remove potentially dangerous headers
    res.removeHeader('X-Powered-By');
    
    // Add security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    next();
}

// Rate limiting middleware (simple implementation)
const rateLimit = new Map();
const MAX_REQUESTS = 100;
const TIME_WINDOW = 15 * 60 * 1000; // 15 minutes

function rateLimiter(req, res, next) {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!rateLimit.has(ip)) {
        rateLimit.set(ip, { count: 1, resetTime: now + TIME_WINDOW });
        return next();
    }
    
    const user = rateLimit.get(ip);
    
    if (now > user.resetTime) {
        rateLimit.set(ip, { count: 1, resetTime: now + TIME_WINDOW });
        return next();
    }
    
    user.count++;
    
    if (user.count > MAX_REQUESTS) {
        res.status(429).json({
            error: 'Too many requests',
            message: 'Please try again later'
        });
        return;
    }
    
    next();
}

// Request validation middleware
function validateRequest(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: 'Validation failed',
                details: error.details[0].message
            });
        }
        next();
    };
}

module.exports = {
    errorHandler,
    notFoundHandler,
    requestLogger,
    securityHeaders,
    rateLimiter,
    validateRequest
};