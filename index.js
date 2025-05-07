const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');
const jwt = require('jsonwebtoken');
const cookieParser=require('cookie-parser')
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser())
const generateId = require('./utils/generateId');
const user = require('./data/user');

// register route
app.post('/register', (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        const isuser = user.find(u => u.username === req.body.username );
        if (isuser) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        user.push({
            id: generateId(),
            username: req.body.username,
            password: req.body.password
        });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
})
// Login route
app.post('/login', (req, res) => {
  const { username ,password} = req.body;
  if (!username && !password) return res.status(400).json({ message: 'Username and password  required' });
    const isuser = user.find(u => u.username === username && u.password === password);
    if (!isuser) return res.status(401).json({ message: 'Invalid username or password' });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token',token,{httpOnly:true,sameSite:'strict'});
  res.status(200).json({ token });
});


app.use('/tasks', taskRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server Error' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
