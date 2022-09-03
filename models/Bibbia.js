const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bibbia', {
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
    tableName: 'bibbia',
    timestamps: false
  });
};
