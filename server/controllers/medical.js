// DEPENDENCIES
const { Op } = require('sequelize');

// MIDDLEWARE
const verifyUserExists = require('../middleware/verifyUserExists');
const {setMedicalFields} = require('../middleware/setFields');

// MODELS
const Users = require('../models/users');
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
    const startDate = req.query.startDate
    const endDate = req.query.endDate;
    verifyUserExists(id)
    Users.findAll({
        where: {
            id: id
        },
        include: [{
            model: Medical,
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
            res.status(404).send({ message: 'no medicals found'})
        }
        res.status(200).send({message: 'OK', rows: rows});
    })
}

//  UPDATE MEDICAL
exports.updateMedical = (req, res) => {
    const id = req.params.id;
    const updatedMedical = req.body;
    let date = updatedMedical.date = new Date(updatedMedical.date);
    if (!date) {
        return res.status(400).send({ message: 'date is required'})
    }
    verifyUserExists(id)
    Medical.findOne({
        where: {
            date: date,
            userId: id
        }
    })
    .then(row => {
        if (!row) {
            return res.status(404).send({ message:'Record not found'})
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
            if (!updatedRow) {
                res.status(404).send({message: "row not found"})
            }
            else {
                res.status(200).send({message: "medical updated", rows: updatedRow});
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