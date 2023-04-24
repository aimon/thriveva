const router = require('express').Router();
const Location = require('./Location');
const LocationService = require('./LocationService');
const { body, validationResult } = require('express-validator');
const ValidationException = require('../shared/ValidationException');
const { createFilterFields } = require('../shared/query')

router.post('/locations', 
  body('name')
    .notEmpty().withMessage('Name is required')
    .bail()
    .isLength({min: 1, max: 150}).withMessage('Name size is invalid'), 
  body('parentLocationId', 'parentLocationId is invalid')
    .isInt({ min: 0 }), 
async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return next(new ValidationException(errors.array()));
    }
    await LocationService.create(req.body);

    res.send({ message: 'Successfully created location' });
  } catch (error) {
    res.status(400).json(error.message);
  }
});


router.get('/locations', async (req, res) => {
  const where = createFilterFields(
    req, ['parentLocationId']
  )

  const results = await Location.findAll({
    where
  });
  const transformed = results.map(result => result.view())

  res.json(transformed);
})

router.get('/locations/:id/path', async (req, res) => {
  try {
    const results = await LocationService.getLocationPath(req.params.id);
    res.json(results);
  } catch {
    res.json([]) 
  }
});

router.get('/locations/:id/children', async (req, res) => {
  const results = await LocationService.getChildren(req.params.id)
  res.json(results);
});

router.delete('/locations/:id/delete', async (req, res) => {
  const results = await LocationService.destroy(req.params.id)
  res.json(results);
});



module.exports = router;