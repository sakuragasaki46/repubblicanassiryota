const { Op } = require('sequelize');
const { Tupper } = require('../dbObjects.js');

module.exports = {
    data: {name: 'tupperCh'},
    async execute (interaction, value){
        const q = `%${value}%`;

        const result = (await Tupper.findAll({
            where: {
                name: {
                    [Op.like]: q
                }
            },
            order: [
                ['posts', 'DESC']
            ],
            limit: 25
        })).map(o => o.name);

        await interaction.respond(result.map(o => ({
            name: o, 
            value: o
        })))
    }
};