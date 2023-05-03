// DEPENDENCIES
const { Op } = require('sequelize');

// MIDDLEWARE
const verifyUserExists = require('../middleware/verifyUserExists');
const {setNutritionFields} = require('../middleware/setFields');

// MODELS
const Users = require('../models/users');
const Nutrition = require('../models/nutrition');


// CRUD CONTROLLERS

// CREATE NUTRITION
exports.createNutrition = (req, res) => {
    const reqObj = req.body;
    const userId = req.params.id
    reqObj.userId = userId;
    reqObj.breakfast = null;
    reqObj.lunch = null;
    reqObj.dinner = null;
    reqObj.snacks = null;
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
        res.status(201).send({message: "New nutrition row created", rows: nutrition});
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
    Users.findAll({
        where: {
            id: id
        },
        include: [{
            model: Nutrition,
            where: { date: { [Op.between]: [startDate, endDate] }, userId: id },
            required: false,
            attributes: {
                exclude: ['userId', 'user_id', 'updatedAt', 'createdAt']
            }
        }
        ],
        attributes: {
            exclude: ['password', 'email', 'refresh_token', 'updatedAt', 'createdAt']
        }
    })
    .then(rows => {
        if (!rows) {
            res.status(404).json({ message: 'no records found'})
        }
        res.status(200).send({message: 'OK', rows: rows});
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
            res.status(200).send({message: "nutrition updated", rows: updatedRow});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        })
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
}