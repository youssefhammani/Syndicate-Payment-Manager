const express = require('express');
const clientController = require('../controllers/clientController.js');
// const { validateclientData } = require('../middleware/validationMiddleware');

const router = express.Router();

router.get('/get-all-clinets', clientController.getAllClients);

router.get('/get-client/:id', clientController.getClientById);

router.post('/create-client', clientController.createClient);

router.put('/update-client/:id', clientController.updateClient);

router.delete('/delete-client/:id', clientController.deleteClient);


module.exports = router;
