import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    try{
        mongoose.connect(process.env.MONGO_URI)
        const users = await User.find();
        return res.json(users);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//mongoose connection
// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//     });
// }).catch((err) => {
//     console.log(err);
// });

