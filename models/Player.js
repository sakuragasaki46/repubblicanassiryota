const Sequelize = require('sequelize');
const { pronoun_accusative } = require('../helpers/inclusion.js');

class Player extends Sequelize.Model {
  age () {
    if (this.birthday) {
      const today = (new Date);
      const birthday = new Date(this.birthday);
      return (
	today.getFullYear() - birthday.getFullYear()
	  - (birthday.getMonth() > today.getMonth() ||
	     birthday.getMonth() == today.getMonth() &&
	     birthday.getDate() > today.getDate()? 1 : 0)
      );
    } else {
      return null;
    }
  }

  pronouns_str() {
    const value = this.pronouns;
    const pron = [];
    if (value & 1) pron.push('he');
    if (value & 2) pron.push('she');
    if (value & 4) pron.push('they');
    if (value & 8) pron.push('it');
    if (value & 16) pron.push('xe');
    if (pron.length === 0) return 'ask';
    if (pron.length === 1) return `${pron[0]}/${pronoun_accusative(pron[0])}`;
    return pron.join('/');
  }

  gender_str() {
    return ({
      1: 'M',
      2: 'F',
      3: 'NB'
    })[this.gender] || '?';
  }

  mbtype_str() {
    let v = this.mbtype;
    let a, b, c, d, e;
    [v, a] = [Math.floor(v / 3), v % 3];
    [v, b] = [Math.floor(v / 3), v % 3];
    [v, c] = [Math.floor(v / 3), v % 3];
    [v, d] = [Math.floor(v / 3), v % 3];
    [v, e] = [Math.floor(v / 10), v % 10];
    return [
      'xIE'[a],
      'xNS'[b],
      'xTF'[c],
      'xJP'[d],
      e? `-${e}`: ''
    ].join('');
  }
}

module.exports = function(sequelize, DataTypes) {
  Player.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    mbtype: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    pronouns: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    citizenship: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    daily_streak: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    last_daily_streak: {
      type: DataTypes.DATE,
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    karma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    tg_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    touched: {
      type: DataTypes.DATE,
      allowNull: false
    },
    blacklisted_until: {
      type: DataTypes.DATE,
      allowNull: true
    },
    crime_info: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    blacklist_reason: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'player',
    tableName: 'player',
    timestamps: false,
    indexes: [
      {
	name: "PRIMARY",
	unique: true,
	using: "BTREE",
	fields: [
          { name: "id" },
	]
      },
    ]
  });
  
  return Player;
};
