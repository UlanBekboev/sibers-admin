// src/app.ts
import express, { Application } from 'express';
import session from 'express-session';
import path, { join } from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { sequelize } from './config/db.js';
import exphbs from 'express-handlebars';
import userRoutes from './routes/userRoutes.js';
import { User } from './models/User.js';
import { Admin } from './models/Admin.js'
import authRoutes from './routes/authRoutes.js';
import { isAuthenticated } from './middlewares/auth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: Application = express();

app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: join(__dirname, "views/layouts"),
    partialsDir: join(__dirname, "views/partials"),
    helpers: {
      eq: (a: any, b: any) => a === b,
      gt: (a: number, b: number) => a > b,
      range: (start: number, end: number) => {
        const arr = [];
        for (let i = start; i <= end; i++) arr.push(i);
        return arr;
      },
      toggleOrder: (order: string) => (order === "asc" ? "desc" : "asc"),
    },
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://cdnjs.cloudflare.com'], // если нужны внешние скрипты
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:'],
    },
  }),
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
  }),
);

// Статика
app.use(express.static(path.join(__dirname, '../public')));

// Роуты (позже подключим auth, users и т.п.)
app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome', message: 'Hello from Express + TS!' });
});

app.use('/', authRoutes);
app.use('/', isAuthenticated, userRoutes);

// DB connect
sequelize.addModels([User, Admin]);

sequelize
  .authenticate()
  .then(() => console.log('DB connected'))
  .catch((err) => console.error('DB connection error:', err));

export default app;
