# Node.js Server

A modern, modular Node.js server application with clean architecture and best practices.

## Features

- 🚀 **Modular Architecture**: Clean separation of concerns with organized directory structure
- 🎨 **Responsive Design**: Mobile-friendly HTML pages with modern CSS
- 🔒 **Security Headers**: Built-in security middleware for protection
- 📊 **Request Logging**: Comprehensive logging for debugging and monitoring
- 🛡️ **Error Handling**: Robust error handling middleware
- 🎯 **Rate Limiting**: Basic rate limiting to prevent abuse
- 📱 **CORS Support**: Cross-Origin Resource Sharing enabled
- 🧪 **Development Ready**: ESLint configuration and development scripts

## Directory Structure

```
nodeJS-server/
├── public/                 # Static assets
│   └── css/
│       └── style.css      # Stylesheets
├── views/                 # HTML templates
│   ├── layout.html       # Main layout template
│   ├── home.html         # Home page
│   ├── about.html        # About page
│   ├── blogs.html        # Blogs page
│   └── contact.html      # Contact page
├── routes/               # Route handlers and middleware
│   ├── web.js           # Web routes
│   └── middleware.js    # Middleware functions
├── utils/               # Utility functions
│   └── helpers.js       # Helper utilities
├── logs/                # Log files (will be created)
├── server.js           # Main server file
├── package.json         # Project configuration
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yeasin4745/nodeJS-server.git
   cd nodeJS-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   # Production mode
   npm start
   
   # Development mode (with auto-reload)
   npm run dev
   ```

## Usage

Once the server is running, you can access the following pages:

- **Home**: http://localhost:8080/
- **About**: http://localhost:8080/about
- **Blogs**: http://localhost:8080/blogs
- **Contact**: http://localhost:8080/contact

## Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server with nodemon for development
- `npm test` - Run tests (placeholder)
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Run ESLint and automatically fix issues
- `npm run logs` - View server logs

## Development

### Adding New Pages

1. Create a new HTML file in the `views/` directory
2. Add the route in `routes/web.js`
3. Update the navigation in `views/layout.html`

### Adding Middleware

1. Create new middleware functions in `routes/middleware.js`
2. Apply the middleware in `server.js`

### Code Style

This project uses ESLint for code quality. To check your code:

```bash
npm run lint
```

To automatically fix issues:

```bash
npm run lint:fix
```

## Environment Variables

The application supports the following environment variables:

- `PORT` - Server port (default: 8080)
- `NODE_ENV` - Environment (development/production)

Example:
```bash
PORT=3000 NODE_ENV=production npm start
```

## Security Features

- Security headers (XSS protection, clickjacking protection)
- CORS enabled for cross-origin requests
- Rate limiting to prevent abuse
- Input sanitization utilities
- Error handling without exposing sensitive information

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Test your changes
6. Submit a pull request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Author

**Md Yeasin Ali**
- GitHub: [yeasin4745](https://github.com/yeasin4745)
- Location: Kurigram District, Bangladesh

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.

---

Built with ❤️ using Node.js