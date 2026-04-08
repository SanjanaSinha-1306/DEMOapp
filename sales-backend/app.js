
require('dotenv').config(); // 1. Load secrets FIRST 
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// 2. Import routes after loading .env
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // For parsing cookies
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true 
}));

app.use('/api/auth', authRoutes);

// 3. Use the PORT from .env 
const PORT = process.env.PORT ; 

app.listen(PORT, () => {
    console.log(`Server is roaring on port http://localhost:${PORT}`);
});