module.exports = {
  async up (queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    const transaction = await queryInterface.sequelize.transaction();

    await queryInterface.createTable('player', {
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
      transaction,
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

    await queryInterface.createTable('tuppergroup', {
      id: {
	autoIncrement: true,
	type: DataTypes.INTEGER,
	allowNull: false,
	primaryKey: true
      },
      user_id: {
	type: DataTypes.BIGINT,
	allowNull: true,
	references: {
          model: 'player',
          key: 'id'
	}
      },
      name: {
	type: DataTypes.STRING(64),
	allowNull: false
      }
    }, {
      transaction,
      tableName: 'tuppergroup',
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
	{
          name: "tuppergroup_user_id",
          using: "BTREE",
          fields: [
            { name: "user_id" },
          ]
	},
      ]
    });

    await queryInterface.createTable('tupper', {
      id: {
	autoIncrement: true,
	type: DataTypes.INTEGER,
	allowNull: false,
	primaryKey: true
      },
      user_id: {
	type: DataTypes.BIGINT,
	allowNull: true,
	references: {
          model: 'player',
          key: 'id'
	}
      },
      name: {
	type: DataTypes.STRING(64),
	allowNull: false
      },
      position: {
	type: DataTypes.INTEGER,
	allowNull: false
      },
      avatar_url: {
	type: DataTypes.STRING(1024),
	allowNull: true
      },
      bracket_start: {
	type: DataTypes.STRING(64),
	allowNull: true
      },
      bracket_end: {
	type: DataTypes.STRING(64),
	allowNull: true
      },
      posts: {
	type: DataTypes.INTEGER,
	allowNull: false,
	defaultValue: 0
      },
      show_brackets: {
	type: DataTypes.BOOLEAN,
	allowNull: false,
	defaultValue: false
      },
      birthday: {
	type: DataTypes.DATEONLY,
	allowNull: true
      },
      description: {
	type: DataTypes.STRING(1024),
	allowNull: true
      },
      tag: {
	type: DataTypes.STRING(64),
	allowNull: false
      },
      group_id: {
	type: DataTypes.INTEGER,
	allowNull: true,
	references: {
          model: 'tuppergroup',
          key: 'id'
	}
      },
      group_pos: {
	type: DataTypes.INTEGER,
	allowNull: false,
	defaultValue: 0
      },
      nick: {
	type: DataTypes.STRING(64),
	allowNull: true
      },
      privacy: {
	type: DataTypes.INTEGER,
	allowNull: false,
	defaultValue: 0
      }
    }, {
      transaction,
      modelName: 'tupper',
      tableName: 'tupper',
      timestamps: true,
      indexes: [
	{
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
          ]
	},
	{
          name: "tupper_user_id_name",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "user_id" },
            { name: "name" },
          ]
	},
	{
          name: "tupper_user_id_position",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "user_id" },
            { name: "position" },
          ]
	},
	{
          name: "tupper_bracket_start_bracket_end",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "bracket_start" },
            { name: "bracket_end" },
          ]
	},
	{
          name: "tupper_group_id_group_pos",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "group_id" },
            { name: "group_pos" },
          ]
	},
	{
          name: "tupper_user_id",
          using: "BTREE",
          fields: [
            { name: "user_id" },
          ]
	},
	{
          name: "tupper_group_id",
          using: "BTREE",
          fields: [
            { name: "group_id" },
          ]
	},
      ]
    });

    await queryInterface.createTable('useralert', {
      id: {
	autoIncrement: true,
	type: DataTypes.INTEGER,
	allowNull: false,
	primaryKey: true
      },
      userid: {
	type: DataTypes.BIGINT,
	allowNull: false
      },
      message: {
	type: DataTypes.STRING(1024),
	allowNull: false
      }
    }, {
      transaction,
      tableName: 'useralert',
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

    await queryInterface.createTable('bibbia', {
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
      transaction,
      tableName: 'bibbia',
      timestamps: false
    });
  }
  ,
  async down () {

    await queryInterface.dropTable('bibbia');
    await queryInterface.dropTable('player');
    await queryInterface.dropTable('tupperhook');
    await queryInterface.dropTable('tupper');
    await queryInterface.dropTable('tuppergroup');
    await queryInterface.dropTable('useralert');
  }
};
