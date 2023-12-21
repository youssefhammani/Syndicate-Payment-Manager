const express = require('express');
const apartmentController = require('../controllers/apartmentController');
// const { validateApartmentData } = require('../middleware/validationMiddleware');

const router = express.Router();

router.get('/get-all-apartments', apartmentController.getAllApartments);

router.get('/get-apartment/:id', apartmentController.getApartmentByIdOrName);

router.post('/create-apartment', apartmentController.createApartment);

router.put('/update-apartment/:id', apartmentController.updateApartment);

router.delete('/delete-apartment/:id', apartmentController.deleteApartment);


module.exports = router;
