import express, { Application } from 'express';
import session from 'express-session';
import path, { join } from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { sequelize } from './config/db.js';
import { engine } from 'express-handlebars';
import userRoutes from './routes/userRoutes.js';
import { User } from './models/User.js';
import { Admin } from './models/Admin.js';
import authRoutes from './routes/authRoutes.js';
import { isAuthenticated } from './middlewares/auth.js';
import csrf from 'csurf';

dotenv.config();

// Convert ES module URL to file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: Application = express();

// Configure Handlebars view engine
app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: join(__dirname, 'views/layouts'),
    partialsDir: join(__dirname, 'views/partials'),
    helpers: {
      eq: (a: any, b: any) => a === b,
      gt: (a: number, b: number) => a > b,
      range: (start: number, end: number) => { // Generate array of numbers for pagination
        const arr = [];
        for (let i = start; i <= end; i++) arr.push(i);
        return arr;
      },
      toggleOrder: (order: string) => (order === 'asc' ? 'desc' : 'asc'), // Toggle sorting order
    },
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Helmet for security headers (Content Security Policy)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-eval'", 'https://cdnjs.cloudflare.com'],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
    },
  }),
);
app.use(morgan('dev')); // Log HTTP requests
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't save empty session
  }),
);

app.use(csrf()); // Enable CSRF protection

// Pass CSRF token to all templates
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', authRoutes);
app.use('/', isAuthenticated, userRoutes);

// Add Sequelize models
sequelize.addModels([User, Admin]);

sequelize
  .authenticate()
  .then(() => console.log('DB connected'))
  .catch((err) => console.error('DB connection error:', err));

export default app;
