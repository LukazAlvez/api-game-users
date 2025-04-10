import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/', router);


let isConnected = false;
async function connectToMongo() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('MongoDB conectado!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
  }
}

// função serverless (exporta o handler)
export default async function handler(req, res) {
  await connectToMongo();
  return app(req, res); // Vercel executa o Express como middleware
}

//mongoose connection
//mongoose.connect(process.env.MONGO_URI)
//.then(() => {
//   console.log('Connected to MongoDB');
//    app.listen(PORT, () => {
//        console.log(`Server running on port ${PORT}`);
//    });
//}).catch((err) => {
//    console.log(err);
//});

