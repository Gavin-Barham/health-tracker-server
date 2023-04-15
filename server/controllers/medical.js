// DEPENDENCIES
const { Op } = require('sequelize');

// MIDDLEWARE
const verifyUserExists = require('../middleware/verifyUserExists');
const {setMedicalFields} = require('../middleware/setFields');

// MODELS
const Medical = require('../models/medical');

// CRUD CONTROLLERS

// CREATE MEDICAL ROW
exports.createMedical = (req, res) => {
    const newMedical = req.body;
    const userId = req.params.id
    newMedical.userId = userId;
    verifyUserExists(userId)
    Medical.findOne({
        where: {
            userId: userId,
            date: new Date(newMedical.date)
        }
    })
    .then(row => {
        if (row) {
            return res.status(400).json({ message: 'date already exists'})
        }

        return Medical.create(newMedical)
    })
    .then(row => {
        res.status(201).send({message: "New medical row created", medical: row});
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
}

// GET ALL MEDICAL BY DATE RANGE
exports.getMedicalByDate = (req, res) => {
    const id = req.params.id;
    const {startDate, endDate} = req.body;
    verifyUserExists(id)
    Medical.findAll({
        where: {
            userId: id,
            date: {[Op.between]: [startDate, endDate]}
        }
    })
    .then(rows => {
        if (!rows) {
            res.status(404).json({ message: 'no medicals found'})
        }
        res.status(200).send({medical: rows});
    })
}

//  UPDATE MEDICAL
exports.updateMedical = (req, res) => {
    const id = req.params.id;
    const updatedMedical = req.body;
    let date = updatedMedical.date;
    if (!date) {
        return res.status(400).json({ message: 'date is required'})
    }
    date = new Date(date);
    verifyUserExists(id)
    Medical.findOne({
        where: {
            date: date,
            userId: id
        }
    })
    .then(row => {
        if (!row) {
            return res.status(404).json({ message:'Record not found'})
        }
        return setMedicalFields(updatedMedical, row)
    })
    .then( updatedFields => {
        Medical.update(updatedFields, {
            where: {
                userId: id,
                date: date
            }
        })
       .then(updatedRow => {
            res.status(200).send({message: "medical updated", medical: updatedRow});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        })
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
}