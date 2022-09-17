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

const FLAGS_TO_PRONOUNS = {
  ask: 0,
  he: 1, him: 1, his: 1,
  she: 2, her: 2, hers: 2,
  they: 4, their: 4, them: 4,
  it: 8, its: 8,
  xe: 16, xem: 16
};

function pronounAccusative(p) {
  return PRONOUN_ACCUSATIVE[p] || (p + 'm');
}

module.exports = {
  pronounAccusative,
  pronoun_accusative: pronounAccusative,
  parsePronouns(s){
    const parts = s.split('/');
    let flags = 0;
    for (const part of parts) {
      if (FLAGS_TO_PRONOUNS[part] === undefined) {
        return null;
      }

      flags &= FLAGS_TO_PRONOUNS[part];
    }

    return flags;
  }
};
