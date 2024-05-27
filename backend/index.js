require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 3001;

// Routes
const userRoute = require('./api/UserRoute');
const bookRoute = require('./api/BookRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello');
});

app.use('/users', userRoute);
app.use('/books', bookRoute);

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Konekcija na bazu uspesna!');
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err.message);
    });
