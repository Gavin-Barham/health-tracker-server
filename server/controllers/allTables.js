// MODELS
const Users = require("../models/users");
const Medical = require ("../models/medical");
const Nutrition = require ("../models/nutrition");
const {  Op  } = require("sequelize");


// CRUD CONTROLLERS

// GET ALL MEDICAL AND NUTRITIONAL BY DATE
exports.getAllByDate = (req, res) => {
    const id = req.params.id;
    Users.findByPk({id : id})
    .then( user => {
        if (!user) {
            return res.status(404).json({ message: 'user not found'})
        }
    })
    let {startDate, endDate} = req.body;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    Users.findAll({
        where: {
            id: id
        },
        include: [{
                model: Medical,
                where: { date: { [Op.between]: [startDate, endDate] }, userId: id },
                required: false
            }, 
            {
                model: Nutrition,
                where: { date: { [Op.between]: [startDate, endDate] }, userId: id  },
                required: false
            }
        ]
    })
    .then(data => {
        if (!data) {
            return res.status(404).json({ message: 'data not found'})
        }
        return res.status(200).send(data);
        
    })
}