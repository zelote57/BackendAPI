const express = require('express');

const placesControllers = require('../controllers/places-controllers');

const router = express.Router();

router.get('/', placesControllers.getAllPlaces);

router.get('/:pid', placesControllers.getPlacesById);

router.get('/users/:uid', placesControllers.getPlacesByUsers);

router.post('/', placesControllers.savePlace);

router.patch('/:pid',placesControllers.updatePlace);

router.delete('/:pid',placesControllers.deletePlace);

module.exports = router;
