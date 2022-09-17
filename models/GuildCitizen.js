/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const Sequelize = require('sequelize');
const { getGovernorName, getRankName } = require('../helpers/citizen.js');

module.exports = (sequelize, DataTypes) => {
    class GuildCitizen extends Sequelize.Model {

        async getCountry(){
            return await sequelize.models.guildcountry.findByPk(this.guild_id);
        }

        async getCitizenName(){
            return (await this.getCountry()).citizen_name;
        }

        async getRankName(){
            const country = await this.getCountry();

            if (country.governor_id === this.player_id){
                return getGovernorName(country.government_type);
            } else {
                return getRankName(this.rank);
            }
        }
    }

    GuildCitizen.init({
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
            allowNull: true,
            references: {
                model: 'guildparty',
                key: 'id'
            }
        }
    }, {
        sequelize,
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
    })

    return GuildCitizen;
}; 