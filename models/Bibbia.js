const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { range, letterRange } = require('../helpers/range.js');

module.exports = function(sequelize, DataTypes) {
  class Bibbia extends Sequelize.Model {
    static async getVersetti(v){
      return await Bibbia.findAll({
        where: Bibbia.getVersettiQuery(v)
      });
    }

    static getVersettiQuery(v){
      const mObj = v.match(/([A-Za-z]+) (\d+):(\d+)([a-z])?(?:-(\d+)([a-z])?)?((?:(?:\d+:)?(?:\d+[a-z]?(?:-\d+[a-z]?)))*)/);

      if (mObj === null) {
        return null;
      }

      let [libro, capitolo, versetto, lettera, versetto2, lettera2, rest] = mObj.slice(1);
      versetto = +versetto;
      if (versetto2) versetto2 = +versetto2;
      
      let checkQuery = {
        libro,
        capitolo
      };
      if (versetto2 && versetto !== versetto2) {
        if (lettera && lettera2 && lettera !== lettera2) {
          checkQuery[Op.or] = [
            {versetto: range(versetto + 1, versetto2)},
            {versetto, [Op.gte]: lettera},
            {versetto: versetto2, [Op.lte]: lettera},
          ];
        } else if (lettera) {
          checkQuery[Op.or] = [
            {versetto: range(versetto + 1, versetto2 + 1)},
            {versetto, [Op.gte]: lettera}
          ]
        } else if (lettera2) {
          checkQuery[Op.or] = [
            {versetto: range(versetto, versetto2)},
            {versetto: versetto2, [Op.lte]: lettera2}
          ]
        } else {
          checkQuery.versetto = range(versetto, versetto2 + 1);
        }
      } else {
        checkQuery.versetto = versetto;
        if (lettera) {
          if (lettera2 && lettera != lettera2){
            checkQuery.lettera = letterRange(lettera, lettera2);
          } else {
            checkQuery.lettera = lettera;
          }
        }
      }

      if (rest) {
        checkQuery = {
          [Op.or]: [
            checkQuery, 
            Bibbia.getVersettiQuery(
              rest.split(',')[0].indexOf(':') >= 0? 
              `${libro} ${rest}`:
              `${libro} ${capitolo}:${rest}`
            )
          ]
        };
      }

      return checkQuery;
    }
  }

  Bibbia.init({
    libro: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    capitolo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    versetto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lettera: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    testo: {
      type: DataTypes.STRING(3000),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'bibbia',
    tableName: 'bibbia',
    primaryKey: false,
    timestamps: false
  });

  Bibbia.removeAttribute("id")

  return Bibbia;
};
