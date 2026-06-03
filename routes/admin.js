const express = require('express');
const router = express.Router();
const Attendee = require('../models/Attendee');

// Auth middleware
function requireAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  res.redirect('/admin/login');
}

// GET - Admin login page
router.get('/login', (req, res) => {
  if (req.session && req.session.isAdmin) {
    return res.redirect('/admin/dashboard');
  }
  res.render('admin/login', {
    title: 'Admin Login',
    error: req.flash('error')[0] || null
  });
});

// POST - Admin login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

  if (username === adminUser && password === adminPass) {
    req.session.isAdmin = true;
    req.session.adminUsername = username;
    res.redirect('/admin/dashboard');
  } else {
    req.flash('error', 'Invalid username or password.');
    res.redirect('/admin/login');
  }
});

// GET - Admin logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// GET - Dashboard / Attendee list
router.get('/dashboard', requireAdmin, async (req, res) => {
  try {
    const attendees = await Attendee.findAll({
      order: [['submittedAt', 'DESC']]
    });

    res.render('admin/dashboard', {
      title: 'Admin Dashboard - Attendee List',
      attendees,
      totalCount: attendees.length
    });
  } catch (error) {
    console.error('Error fetching attendees:', error);
    res.render('admin/dashboard', {
      title: 'Admin Dashboard - Attendee List',
      attendees: [],
      totalCount: 0,
      error: 'Failed to load attendees.'
    });
  }
});

// GET - Print view
router.get('/print', requireAdmin, async (req, res) => {
  try {
    const attendees = await Attendee.findAll({
      order: [['submittedAt', 'ASC']]
    });

    res.render('admin/print', {
      title: 'Attendee List - Print View',
      attendees,
      totalCount: attendees.length,
      printDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      })
    });
  } catch (error) {
    console.error('Error fetching attendees for print:', error);
    res.redirect('/admin/dashboard');
  }
});

// DELETE - Remove attendee (API endpoint)
router.delete('/attendee/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const attendee = await Attendee.findByPk(id);
    if (!attendee) {
      return res.status(404).json({ success: false, message: 'Attendee not found' });
    }
    await attendee.destroy();
    res.json({ success: true, message: 'Attendee removed successfully' });
  } catch (error) {
    console.error('Error deleting attendee:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
