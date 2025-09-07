// src/server.ts
import app from './app.js';
import { sequelize } from './config/db.js';

const PORT = process.env.PORT || 3000;

// Sync database tables
sequelize
  .sync({ alter: true }) // Create or update tables based on models without dropping data
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Sync error:', err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
