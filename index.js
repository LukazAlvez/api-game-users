import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';    
import User from './models/user.js';

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
await mongoose.connect(process.env.MONGO_URI)

const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

//cria um novo usuário
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar usuário', details: err });
  }
});

  //atualiza um usuário
  app.put('/users/:id', async (req, res) => {
    try {
      const { name, email, score } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, score },
        { new: true } // Retorna o documento atualizado
      );
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  });

//deleta um usuário
app.delete('/users/:id', async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  });
  

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

