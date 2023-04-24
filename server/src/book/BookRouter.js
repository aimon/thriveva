const express = require('express');
const Book = require('./Book');
const router = express.Router();
const idNumberControl = require('../shared/idNumberControl');
const BookService = require('./BookService');
const { body, validationResult } = require('express-validator');
const ValidationException = require('../shared/ValidationException');

router.post('/books', 
  body('title')
    .notEmpty().withMessage('Title is required')
    .bail()
    .isLength({min: 1, max: 150}).withMessage('Title size is invalid'), 
  body('locationId')
    .notEmpty().withMessage('Location is required')
    .isInt({ min: 0 }), 
async (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return next(new ValidationException(errors.array()));
  }

  try {
    await BookService.create(req.body);

    res.send({ message: 'Ok' });    
  } catch (error) {
    res.status(400).json(error.message)
  }

});

router.put('/books/:id/change-location', idNumberControl, async (req, res) => {
  await BookService.updateLocation(req.params.id, req.body.locationId)
  res.send({ message: 'Ok' });
});


router.get('/books', async (req, res) => {
  const results = await Book.findAll();
  res.json(results);
})

router.delete('/books/:id/delete', async (req, res) => {
  const results = await BookService.destroy(req.params.id)
  res.json(results);
});

module.exports = router;