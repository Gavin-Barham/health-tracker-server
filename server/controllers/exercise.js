// DEPENDENCIES
const { Op } = require('sequelize');

// MIDDLEWARE
const verifyUserExists = require('../middleware/verifyUserExists');
const {setExerciseFields} = require('../middleware/setFields');

// MODELS
const Users = require('../models/users');
const Exercise = require('../models/exercise');

// CRUD CONTROLLERS

// CREATE MEDICAL ROW
exports.createExercise = (req, res) => {
    const newExercise = req.body;
    const userId = req.params.id
    newExercise.userId = userId;
    newExercise.blood_pressure = null;
    verifyUserExists(userId)
    Exercise.findOne({
        where: {
            userId: userId,
            date: new Date(newExercise.date)
        }
    })
    .then(row => {
        if (row) {
            return res.status(400).json({ message: 'date already exists'})
        }

        return Exercise.create(newExercise)
    })
    .then(row => {
        res.status(201).send({message: "New medical row created", exercise: row});
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
}

// GET ALL MEDICAL BY DATE RANGE
exports.getExerciseByDate = (req, res) => {
    const id = req.params.id;
    const startDate = req.query.startDate
    const endDate = req.query.endDate;
    verifyUserExists(id)
    Users.findAll({
        where: {
            id: id
        },
        include: [{
            model: Exercise,
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
            res.status(404).send({ message: 'no exercise rows found'})
        }
        res.status(200).send({message: 'OK', rows: rows});
    })
}

//  UPDATE MEDICAL
exports.updateExercise = (req, res) => {
    const id = req.params.id;
    const updatedExercise = req.body;
    let date = updatedExercise.date = new Date(updatedExercise.date);
    if (!date) {
        return res.status(400).send({ message: 'date is required'})
    }
    verifyUserExists(id)
    Exercise.findOne({
        where: {
            date: date,
            userId: id
        }
    })
    .then(row => {
        if (!row) {
            return res.status(404).send({ message:'Record not found'})
        }
        return setExerciseFields(updatedExercise, row)
    })
    .then( updatedFields => {
        Exercise.update(updatedFields, {
            where: {
                userId: id,
                date: date
            }
        })
       .then(updatedRow => {
            if (!updatedRow) {
                res.status(404).send({message: "row not found"})
            }
            else {
                res.status(200).send({message: "exercise updated", rows: updatedRow});
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        })
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
}