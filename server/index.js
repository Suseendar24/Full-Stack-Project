const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from the same directory as this file
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// User Schema & Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  level: { type: Number, default: 1 },
  memberType: { type: String, default: 'VETERAN' },
  status: { type: String, default: 'Online' },
  currentActivity: { type: String, default: 'Browsing Store' }
});

const User = mongoose.model('User', userSchema);

// Seed function
const seedUsers = async () => {
  try {
    const names = [
      'aathavan', 'sabthagirivasan', 'naveen', 'thrashan shri', 
      'nithya aura', 'ronak', 'sri pranav karthik', 'vekash', 
      'madhan', 'nandha'
    ];
    const activities = ['Playing Subway Surfers', 'Playing Level Devil', 'Playing Stickman Hook', 'Online', 'Browsing Live'];

    for (const name of names) {
      const exists = await User.findOne({ username: name });
      if (!exists) {
        await User.create({
          username: name,
          email: `${name.replace(/\s/g, '').toLowerCase()}@gamersworld.com`,
          password: 'password123',
          status: 'Online',
          currentActivity: activities[Math.floor(Math.random() * activities.length)]
        });
        console.log(`Seeded account for: ${name}`);
      }
    }
  } catch (err) {
    console.error('Error during seeding:', err);
  }
};

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ message: 'Username or Email already exists' });
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ user: { username: newUser.username, email: newUser.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) return res.status(400).json({ message: 'Invalid credentials' });
    res.status(200).json({ user: { username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/users/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);
    const users = await User.find({ username: { $regex: query, $options: 'i' } }).limit(10).select('username email currentActivity status');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Search error' });
  }
});

// Start Server
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gamers_world';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('SUCCESS: Connected to MongoDB');
    seedUsers().then(() => {
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`SERVER RUNNING: http://127.0.0.1:${PORT}`);
      });
    });
  })
  .catch(err => {
    console.error('CRITICAL: MongoDB connection failed:', err.message);
    // Still start listening so health check works, but DB routes will fail
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`SERVER RUNNING (NO DB): http://127.0.0.1:${PORT}`);
    });
  });
