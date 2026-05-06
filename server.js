const http = require('http');
const path = require('path');
const fs = require('fs');
const { getHomePage, getAboutPage, getBlogsPage, getContactPage, handleNotFound } = require('./routes/web');
const { requestLogger, securityHeaders, errorHandler, notFoundHandler } = require('./routes/middleware');

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    // Apply middleware
    securityHeaders(req, res, () => {
        requestLogger(req, res, () => {
            handleRequest(req, res);
        });
    });
});

function handleRequest(req, res) {
    const url = req.url;
    const method = req.method;

    // Log request
    console.log(`${new Date().toISOString()} - ${method} ${url}`);

    // Handle static files
    if (url.startsWith('/css/') || url.startsWith('/js/') || url.startsWith('/images/')) {
        const filePath = path.join(__dirname, 'public', url);
        serveStaticFile(filePath, res);
        return;
    }

    // Handle routes
    if (method === 'GET') {
        switch (url) {
            case '/':
                getHomePage(req, res);
                break;
            case '/about':
                getAboutPage(req, res);
                break;
            case '/blogs':
                getBlogsPage(req, res);
                break;
            case '/contact':
                getContactPage(req, res);
                break;
            default:
                handleNotFound(req, res);
        }
    } else {
        handleNotFound(req, res);
    }
}

function serveStaticFile(filePath, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error serving static file:', err);
            handleNotFound(req, res);
            return;
        }

        const extname = path.extname(filePath);
        let contentType = 'text/html';

        switch (extname) {
            case '.css':
                contentType = 'text/css';
                break;
            case '.js':
                contentType = 'application/javascript';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpg';
                break;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});