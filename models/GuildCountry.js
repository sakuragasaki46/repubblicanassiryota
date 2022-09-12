/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class GuildCountry extends Sequelize.Model {
        citizenCount(){
            return sequelize.models.guildcitizen.count({
                where: {
                    guild_id: this.id
                }
            })
        }
    }

    GuildCountry.init({
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
        sequelize,
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

    return GuildCountry;
}