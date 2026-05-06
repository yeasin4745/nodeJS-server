const fs = require('fs');
const path = require('path');

// Utility functions for file operations
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function readFile(filePath, encoding = 'utf8') {
    try {
        return fs.readFileSync(filePath, encoding);
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return null;
    }
}

function writeFile(filePath, content) {
    try {
        ensureDirectoryExists(path.dirname(filePath));
        fs.writeFileSync(filePath, content);
        return true;
    } catch (error) {
        console.error(`Error writing file ${filePath}:`, error);
        return false;
    }
}

// Logger utility
function log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    if (data) {
        console.log(logMessage, JSON.stringify(data, null, 2));
    } else {
        console.log(logMessage);
    }
}

// Error handler utility
function handleError(error, context = '') {
    const errorMessage = context ? `${context}: ${error.message}` : error.message;
    log('ERROR', errorMessage);
    
    // You could add more sophisticated error handling here
    // like sending error notifications, writing to error logs, etc.
}

// Sanitize input utility
function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input.replace(/[<>]/g, '');
}

module.exports = {
    ensureDirectoryExists,
    readFile,
    writeFile,
    log,
    handleError,
    sanitizeInput
};