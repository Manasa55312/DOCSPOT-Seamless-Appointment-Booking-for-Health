const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctorModel'); // ✅ This fixes the ReferenceError

const {
  registerDoctor,
  getAllDoctors,
  getPendingDoctors,
  updateDoctorStatus,
  updateDoctorProfile
} = require('../utils/doctorController');

const { protect } = require('../utils/middleware/authMiddleware');

// 🔐 Doctor Registration (Authenticated User Only)
router.post('/register', protect, registerDoctor);

// 🧑‍⚕️ Doctor updates their own profile
router.put('/update', protect, updateDoctorProfile);

// 👤 Get logged-in doctor profile
router.get('/me', protect, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id }).populate('user', 'name email');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json({ doctor });
  } catch (err) {
    console.error('Get doctor failed:', err);
    res.status(500).json({ message: 'Failed to load doctor profile' });
  }
});

// 🛡️ Admin: Get All Pending Doctors
router.get('/pending', protect, getPendingDoctors);

// 🛡️ Admin: Approve or Reject a Doctor
router.put('/:id/status', protect, updateDoctorStatus);

// 🟢 Public: Get All Approved Doctors (for booking, listings)
router.get('/', getAllDoctors);

module.exports = router;
