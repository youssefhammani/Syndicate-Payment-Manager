const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const dbMiddleware = require('../src/middleware/dbMiddleware');

const app = express();
dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(dbMiddleware);

// Routes and other app configuration
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const apartmentRoutes = require('./routes/apartmentRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const clientRoutes = require('./routes/clientRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/users', userRoutes);
app.use('/api/apartments', apartmentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/clients', clientRoutes);



module.exports = app;
