'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const DataTypes = Sequelize.DataTypes;
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable('guildcountry', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        citizen_name: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        premium_until: {
            type: DataTypes.DATE,
            allowNull: true
        },
        chain_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        partnerships_done: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        governor_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'player',
                key: 'id'
            }
        },
        government_type: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        locale: {
            type: DataTypes.STRING(16),
            defaultValue: 'it'
        }
      }, {
        transaction,
          modelName: 'guildcountry',
          tableName: 'guildcountry',
          timestamps: false,
          indexes: [
              {
                  fields: ['name']
              },
              {
                  fields: ['locale']
              },
              {
                  fields: ['governor_id']
              }
          ]
      });
      await queryInterface.createTable('guildcitizen', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        player_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'player',
                key: 'id'
            }
        },
        guild_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'guildcountry',
                key: 'id'
            }
        },
        rank: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        citizen_since: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        party_id: {
            type: DataTypes.BIGINT,
            allowNull: true
            // deferring foreign key constraint
        }
    }, {
        transaction,
        modelName: 'guildcitizen',
        tableName: 'guildcitizen',
        timestamps: false,
        indexes: [
            {
                fields: ['player_id', 'guild_id'],
                unique: true
            },
            {
                fields: ['citizen_since']
            }
        ]
    });

      await queryInterface.createTable('guildparty', 
        {
          id: {
              type: DataTypes.BIGINT,
              primaryKey: true,
              allowNull: false,
              autoIncrement: true
          },
          guild_id: {
              type: DataTypes.BIGINT,
              allowNull: false,
              references: {
                  model: 'guildcountry',
                  key: 'id'
              }
          },
          acronym: {
              type: DataTypes.STRING(8),
              allowNull: false
          },
          name: {
              type: DataTypes.STRING(64),
              allowNull: false
          },
          secretary_id: {
              type: DataTypes.BIGINT,
              allowNull: true,
              references: {
                  model: 'player',
                  key: 'id'
              }
          },
          ideology: {
              type: DataTypes.STRING(128),
              allowNull: true
          },
          description: {
              type: DataTypes.STRING(1024),
              allowNull: true
          },
          avatar_url: {
              type: DataTypes.STRING(1024),
              allowNull: true
          }
      }, {
          transaction,
          modelName: 'guildparty',
          tableName: 'guildparty',
          timestamps: false,
          indexes: [
              {
                  fields: ['guild_id', 'acronym'],
                  unique: true
              },
              {
                  fields: ['guild_id']
              }
          ]
      });

      await queryInterface.addConstraint('guildcitizen', {
        type: 'foreign key',
        fields: ['party_id'],
        references: {
          table: 'guildparty',
          field: 'id'
        }
      }, {transaction});
    });

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('guildparty');
      await queryInterface.dropTable('guildcitizen');
      await queryInterface.dropTable('guildcountry');
    });
  }
};
