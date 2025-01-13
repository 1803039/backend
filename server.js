const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define User schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    type: String,
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
            res.json({ success: true, message: `Hello from ${user.type}` });
        } else {
            res.json({ success: false, message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
