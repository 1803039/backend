const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000
const MONGO_URI = process.env.MONGO_URI; // Default MongoDB URI


app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`MongoDB connected to ${MONGO_URI}`)) //using backtic
  .catch(err => console.log(err));

// Define User schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// API endpoint for login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.json({ success: true, message: 'User exists' });
        } else {
            res.json({ success: false, message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
