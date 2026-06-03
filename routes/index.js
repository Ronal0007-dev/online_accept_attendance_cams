const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Attendee = require('../models/Attendee');

// GET - Home / RSVP form
router.get('/', (req, res) => {
  res.render('index', {
    title: 'CAMS | Graduation Ceremony',
    errors: [],
    formData: {}
  });
});

// POST - Submit RSVP
router.post('/rsvp', [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 100 }).withMessage('First name must be under 100 characters'),
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 100 }).withMessage('Last name must be under 100 characters'),
  body('childName')
    .trim()
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 100 }).withMessage('Child name must be under 100 characters'),
  body('phoneNumber')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[\d\s\+\-\(\)]{7,20}$/).withMessage('Please enter a valid phone number')
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('index', {
      title: 'CAMS | Graduation Ceremony',
      errors: errors.array(),
      formData: req.body
    });
  }

  try {
    const { firstName, lastName, childName, phoneNumber } = req.body;

    await Attendee.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      childName: childName ? childName.trim() : null,
      phoneNumber: phoneNumber.trim()
    });

    res.render('index', {
      title: 'CAMS | Graduation Ceremony',
      errors: [],
      formData: {},
      success: true,
      attendeeName: `${firstName.trim()} ${lastName.trim()}`
    });
  } catch (error) {
    console.error('Error saving attendee:', error);
    res.render('index', {
      title: 'CAMS | Graduation Ceremony',
      errors: [{ msg: 'Something went wrong. Please try again.' }],
      formData: req.body
    });
  }
});

module.exports = router;
