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
    
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Connected to MongoDB');
        try {
            User.find({}).then((users) => {
                res.json(users);
            });
        } catch (err) {
            console.log(err);
        }
    }).catch((err) => {
        console.log(err);
    });
    

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

