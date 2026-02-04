import express from 'express';
import cors from 'cors';
import itemRoutes from './routes/items.js';

const app = express();
const port = 3002;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/items', itemRoutes);

// Start server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
