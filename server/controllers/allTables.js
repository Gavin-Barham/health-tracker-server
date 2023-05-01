// MODELS
const Users = require("../models/users");
const Medical = require ("../models/medical");
const Nutrition = require ("../models/nutrition");
const {  Op  } = require("sequelize");


// CRUD CONTROLLERS

// GET ALL MEDICAL AND NUTRITIONAL BY DATE
exports.getAllByDate = (req, res) => {
    const id = req.params.id;
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;
  
    Users.findByPk(id).then((user) => {
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
  
      startDate = new Date(startDate);
      endDate = new Date(endDate);
  
      Users.findAll({
        where: {
          id: id,
        },
        include: [
          {
            model: Medical,
            where: { date: { [Op.between]: [startDate, endDate] }, userId: id },
            required: false,
            attributes: {
              exclude: ["userId", "user_id", "updatedAt", "createdAt"],
            },
          },
          {
            model: Nutrition,
            where: { date: { [Op.between]: [startDate, endDate] }, userId: id },
            required: false,
            attributes: {
              exclude: ["userId", "user_id", "updatedAt", "createdAt"],
            },
          },
        ],
        attributes: {
          exclude: ["password", "email", "refresh_token", "updatedAt", "createdAt"],
        },
      }).then((data) => {
        if (!data) {
          return res.status(404).send({ message: "data not found" });
        }
  
        return res.status(200).send({ message: "ok", rows: data });
      })
      .catch(err => {
        res.status(500).send({ message: err.message })
      })
    }).catch((err) => {
      res.status(500).send({ message: err.message });
    });
  };
  