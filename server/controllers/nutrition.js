// DEPENDENCIES
const { Op } = require('sequelize');

// MIDDLEWARE
const verifyUserExists = require('../middleware/verifyUserExists');
const {setNutritionFields} = require('../middleware/setFields');

// MODELS
const Nutrition = require('../models/nutrition');


// CRUD CONTROLLERS

// CREATE NUTRITION
exports.createNutrition = (req, res) => {
    const reqObj = req.body;
    const userId = req.params.id
    reqObj.userId = userId;
    verifyUserExists(userId)

    Nutrition.findOne({
        where: {
            userId: userId,
            date: reqObj.date
        }
    })
    .then(row => {
        if (row) {
            return res.status(400).json({ message: 'date already exists'})
        }
    })
    Nutrition.create(reqObj)
    .then(nutrition => {
        res.status(201).send({message: "New nutrition row created", nutrition: nutrition});
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
}

// GET ALL NUTRITION BY DATE RANGE
exports.getNutritionByDate = (req, res) => {
    const id = req.params.id;
    const {startDate, endDate} = req.body;
    verifyUserExists(id)
    Nutrition.findAll({
        where: {
            userId: id,
            date: {[Op.between]: [startDate, endDate]}
        }
    })
    .then(rows => {
        if (!rows) {
            res.status(404).json({ message: 'no records found'})
        }
        res.status(200).send({nutrition: rows});
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
}

//  UPDATE nutrition
exports.updateNutrition = (req, res) => {
    const id = req.params.id;
    const updatedNutrition = req.body;
    console.log(updatedNutrition);
    let date = updatedNutrition.date;
    if (!date) {
        return res.status(400).json({ message: 'date is required'})
    }
    date = new Date(date);
    verifyUserExists(id)
    Nutrition.findOne({
        where: {
            date: date,
            userId: id
        }
    })
    .then(row => {
        if (!row) {
            return res.status(404).json({ message:'Record not found'})
        }
        return setNutritionFields(updatedNutrition, row)
    })
    .then( updatedFields => {
        console.log(updatedFields);
        Nutrition.update(updatedFields, {
            where: {
                userId: id,
                date: date
            }
        })
       .then(updatedRow => {
            res.status(200).send({message: "nutrition updated", nutrition: updatedRow});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        })
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
}