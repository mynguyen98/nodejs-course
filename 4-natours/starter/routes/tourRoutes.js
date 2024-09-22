const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../controller/tourController');
const router = express.Router();
// Param middleware for 'id'
router.param('tourId', (req, res, next, id) => {
  console.log(`Request received with 111 id: ${id}`);
  next();
});
router.route('/').get(getAllTours).post(createTour);

router
  .route('/:tourId')
  .all((req, _res, next) => {
    console.log('params', req.params);
    const { tourId } = req.params;
    console.log('>>>>>>>>>>>>>>', tourId);
    next();
  })
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
