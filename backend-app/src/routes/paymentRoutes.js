const express = require('express');
const paymentController = require('../controllers/paymentController');
// const { validatepaymentData } = require('../middleware/validationMiddleware');

const router = express.Router();

router.get('/get-all-payments', paymentController.getAllPayments);

router.get('/get-payment/:id', paymentController.getPaymentById);

router.post('/create-payment', paymentController.createPayment);

router.put('/update-payment/:id', paymentController.updatePayment);

router.delete('/delete-payment/:id', paymentController.deletePayment);


module.exports = router;
