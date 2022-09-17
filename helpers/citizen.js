/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const MAX_RANK = 8192;
const RANK_NAMES = {
    8192: 'Capo di Stato alleato',
    4096: 'Nobile',
    2048: 'Esecutivo',
    1024: 'Giudice',
    512: 'Pubblico Ministero',
    256: 'Parlamentare',
    128: 'Pulotto',
    64: 'Ambasciatore',
    32: 'Avvocato',
    16: 'Giornalista',
    8: 'Psicologo',
    4: 'Raccomandato',
    2: 'Adulto',
    1: 'Persona non facilmente offendibile'
};
const GOVERNOR_NAMES = {
    1: 'Dittatore',
    2: 'Presidente',
    3: 'Re',
    4: 'Re',
    5: 'Presidente',
    6: 'Presidente della Repubblica',
    7: 'Presidente',
    8: 'Presidente',
    9: 'Sommo sacerdote',
    10: 'Emiro'
};

module.exports = {
    getRankName(citizenRank){
        const arr = [];

        for (let i = MAX_RANK; i >= 1; i /= 2){
            if (citizenRank & i) arr.push(RANK_NAMES[i]);
        }    

        return arr.join(", ") || "Cittadino semplice";
    },
    getGovernorName(governmentType) {
        return GOVERNOR_NAMES[governmentType];
    }
}