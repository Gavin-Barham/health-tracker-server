const express = require('express');
const router = express.Router();

// IMPORT CONTROLLERS
const {  updateUserById, deleteUserById} = require('../controllers/users');
const {  createMedical, getMedicalByDate, updateMedical } = require('../controllers/medical');
const {  createNutrition, getNutritionByDate, updateNutrition } = require('../controllers/nutrition');
const {  getAllByDate  } = require('../controllers/allTables');


// ROUTES FOR /users
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

// ROUTES FOR /users/medical
router.get('/medical/:id', getMedicalByDate);
router.post('/medical/:id', createMedical);
router.put('/medical/:id', updateMedical);

// ROUTES FOR /users/nutrition
router.get('/nutrition/:id', getNutritionByDate);
router.post('/nutrition/:id', createNutrition);
router.put('/nutrition/:id', updateNutrition);


router.get('/all/:id/', getAllByDate);

module.exports = router;