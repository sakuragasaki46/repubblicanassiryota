/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

module.exports = function(v, symbol = 'ꝁ') {
  return `${symbol} ${(+v).toLocaleString('en-US')}`;
}
