/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

module.exports = function(msg){
  return msg.replace(/@everyone|@here|<@[!&]?\d+>/g, '');
}
