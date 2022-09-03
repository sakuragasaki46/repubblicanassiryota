const Sequelize = require('sequelize');
const { pronoun_accusative } = require('../helpers/inclusion.js');
const PlayerAct = require('../helpers/PlayerAct.js');

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

  async touch () {
    this.touched = new Date;
    this.save();
  }
  
  maxExperience() {
    return this.level * 32 + 48;
  }

  addExperience(xp){
    let newXp = this.experience + xp;
    while (newXp > this.maxExperience()) {
      newXp -= this.maxExperience()
      this.level += 1;
      this.levelUpReward();
    }
    this.experience = newXp;
  }

  addBalance(coins){
    this.balance = BigInt(this.balance) + BigInt(coins);
  }

  levelUpReward(){
    const levelUpCoins = this.level % 5 === 0? 10 + this.level * 1 : 0 ;
    this.addBalance(levelUpCoins);

    // TODO create alert
  }

  isBlacklisted() {
    if (this.blacklisted_until !== null) {
      return new Date(this.blacklisted_until) < new Date(); 
    }
    return false;
  }

  async act (interaction, callback, endXpReward = 4) {
    return await new PlayerAct(this, endXpReward).start(interaction, callback);
  }

  collectDaily (){
    const now = new Date;
    const thenStreak = this.last_daily_streak;
    let oldDailyStreak = null;
    const nextDailyOn = Math.ceil(now / 86400000) * 86400000;
    
    if (thenStreak) {
      const dayInterval = (
	Math.floor(+now / 86400000) - Math.floor(+thenStreak / 86400000)
      );

      if (dayInterval > 1) {
	oldDailyStreak = this.daily_streak;
	this.daily_streak = 0;
      } else if (dayInterval === 1) {
	this.daily_streak += 1;
      } else {
	return {
	  collected: false,
	  nextDailyOn
	};
      }
    } else {
      this.daily_streak = 0;
    }

    const baseCoins = 10 + Math.floor(Math.random() * 6);
    const streakCoins = 2 * this.daily_streak;
    const totalCoins = baseCoins + streakCoins;

    this.last_daily_streak = now;
    this.addBalance(totalCoins);

    return {
      collected: true,
      totalCoins,
      baseCoins,
      streakCoins,
      curStreak: this.dailyStreak,
      lostStreak: oldDailyStreak,
      nextDailyOn
    };
  }
  
  static async findByDsUser (user){
    const pl = await Player.findByPk(user.id);
    if (!pl) {
      return await Player.create({
	id: user.id,
	name: user.name
      });
    }

    if (pl.name !== user.name) {
      pl.name = user.name;
      await pl.touch();
    }
    
    return pl;
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
      type: DataTypes.BIGINT,
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
      allowNull: false,
      defaultValue: DataTypes.NOW
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
