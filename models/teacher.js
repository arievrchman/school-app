'use strict';
const sequelize = require('sequelize');
const Op = sequelize.Op;
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i,
          msg: 'Please input valid email'
        },
        isUnique: function (value) {
          return new Promise((resolve, reject) => {
            Teacher.findOne({
              where: {
                email: value,
                id: { [Op.ne]: this.id }
              }
            })
              .then(function (result) {
                // console.log(result);
                if (result) {
                  reject('Email already exist');
                } else {
                  resolve(true);
                }
              })
              .catch((err) => {
                reject(err);
              });
          });
        }
      }
    }
  }, {});
  Teacher.associate = function (models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject);
  };
  return Teacher;
};