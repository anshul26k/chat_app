import express from 'express';
import healthRoutes from './routes/health.routes';

const app = express();
app.use(express.json());

app.use('/api', healthRoutes);

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;