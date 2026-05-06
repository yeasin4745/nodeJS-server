// Simple test script to verify the server
const http = require('http');
const fs = require('fs');

// Test if all required files exist
const requiredFiles = [
    'server.js',
    'package.json',
    'views/layout.html',
    'views/home.html',
    'views/about.html',
    'views/blogs.html',
    'views/contact.html',
    'public/css/style.css',
    'routes/web.js',
    'routes/middleware.js',
    'utils/helpers.js',
    '.gitignore',
    'README.md'
];

console.log('Checking required files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✓ ${file}`);
    } else {
        console.log(`✗ ${file} - NOT FOUND`);
        allFilesExist = false;
    }
});

if (allFilesExist) {
    console.log('\n✅ All required files exist!');
    
    // Test package.json
    try {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        console.log(`✅ Package name: ${packageJson.name}`);
        console.log(`✅ Package version: ${packageJson.version}`);
        console.log(`✅ Main file: ${packageJson.main}`);
    } catch (error) {
        console.log('✗ Error reading package.json');
    }
    
    console.log('\n🚀 Server structure is ready!');
    console.log('To start the server: npm start');
    console.log('To run in development: npm run dev');
} else {
    console.log('\n❌ Some files are missing!');
}

console.log('\n📁 Project structure:');
console.log('📂 public/     - Static assets');
console.log('📂 views/      - HTML templates');
console.log('📂 routes/      - Route handlers');
console.log('📂 utils/       - Utility functions');
console.log('📄 server.js    - Main server file');
console.log('📄 package.json - Project configuration');
console.log('📄 README.md    - Documentation');