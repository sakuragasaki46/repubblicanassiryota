/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const PRONOUN_ACCUSATIVE = {
  'he': 'him',
  'she': 'her',
  'they': 'them',
  'it': 'its',
  'xe': 'xem'
};

function pronoun_accusative(p) {
  return PRONOUN_ACCUSATIVE[p] || (p + 'm');
}

module.exports = {
  pronoun_accusative
};
