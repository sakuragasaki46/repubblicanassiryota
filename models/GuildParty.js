/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class GuildParty extends Sequelize.Model {
        
    }

    GuildParty.init({
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
        sequelize,
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
    })

    return GuildParty;
};