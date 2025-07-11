require('dotenv').config({ path: './backend/.env' }); 

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes'); 
const connectDB = require('./config/db'); 

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the E-Commerce API!'); 
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
