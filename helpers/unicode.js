/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const SUPERSCRIPT_DIGITS = '⁰¹²³⁴⁵⁶⁷⁸⁹';

module.exports = {
    superscriptNumber(n){
        n = String(n);

        return Array.from(n).map(x => SUPERSCRIPT_DIGITS[x]).join('');
    }
}