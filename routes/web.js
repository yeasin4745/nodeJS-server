const fs = require('fs');
const path = require('path');

// Simple template engine for basic HTML templating
function renderTemplate(templateName, data = {}) {
    const templatePath = path.join(__dirname, '..', 'views', `${templateName}.html`);
    
    try {
        let template = fs.readFileSync(templatePath, 'utf8');
        
        // Simple variable replacement
        Object.keys(data).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            template = template.replace(regex, data[key]);
        });
        
        // Simple block replacement
        template = template.replace(/{{#extend "([^"]+)"}}[\s\S]*?{{\/extend}}/, '');
        template = template.replace(/{{#content "main"}}([\s\S]*?){{\/content}}/, '$1');
        
        return template;
    } catch (error) {
        console.error('Error rendering template:', error);
        return '<h1>Template not found</h1>';
    }
}

function getHomePage(req, res) {
    const html = renderTemplate('home', {
        title: 'Home Page'
    });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
}

function getAboutPage(req, res) {
    const html = renderTemplate('about', {
        title: 'About Me'
    });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
}

function getBlogsPage(req, res) {
    const html = renderTemplate('blogs', {
        title: 'Blogs'
    });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
}

function getContactPage(req, res) {
    const html = renderTemplate('contact', {
        title: 'Contact'
    });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
}

function handleNotFound(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Page Not Found</h1><p>The page you are looking for does not exist.</p>');
}

module.exports = {
    getHomePage,
    getAboutPage,
    getBlogsPage,
    getContactPage,
    handleNotFound
};