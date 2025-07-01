const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../utils/middleware/authMiddleware');

const {
  getPendingDoctors,
  approveDoctor,
  getAllAppointments
} = require('../utils/adminController'); // ✅ Make sure this path is correct

// 🩺 Get all doctors pending approval
router.get('/doctors/pending', protect, adminOnly, getPendingDoctors);

// ✅ Approve or reject doctor
router.put('/doctors/:id/approve', protect, adminOnly, approveDoctor);

// 📋 Get all appointments (for admin)
router.get('/all', protect, adminOnly, getAllAppointments);

module.exports = router;
