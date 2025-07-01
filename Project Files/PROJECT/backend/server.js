const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db'); // If db.js is in root backend folder

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/user');
const doctorRoutes = require('./routes/doctor');
const appointmentRoutes = require('./routes/appointment');
const adminRoutes = require('./routes/admin'); // ✅ You missed assigning this to a variable before

// Use Routes
app.use('/api/users', userRoutes); // 🧑‍💻 User Register/Login
app.use('/api/doctors', doctorRoutes); // 👨‍⚕️ Doctor Register/View
app.use('/api/appointments', appointmentRoutes); // 📅 Book & Manage Appointments
app.use('/api/admin', adminRoutes); // 🛠️ Admin Approvals & Management

// Default route
app.get('/', (req, res) => {
  res.send('✅ DocSpot API is running');
});

// Server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

