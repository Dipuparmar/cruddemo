import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app is running on port ${port}...`);
});

mongoose
  .connect(process.env.DATABASE!)
  .then(() => console.log('DB connection successful!!'))
  .catch((err) => console.error('DB connection error:', err));