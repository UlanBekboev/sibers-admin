// src/server.ts
import app from './app.js';
import { sequelize } from './config/db.js';
import { User } from './models/User.js';

const PORT = process.env.PORT || 3000;

sequelize
  .sync({ alter: true }) // создаёт/обновляет таблицу users
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Sync error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
