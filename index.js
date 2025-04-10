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

app.post('/user', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
});
app.put('/user:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
});


app.delete('/user:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
});




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

