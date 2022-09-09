const yargs = require('yargs');
const { Player } = require('../dbObjects.js');
const timeNumbers = require('../helpers/timeNumbers.js');

const { argv } = yargs
      .option('id', {
	alias: 'i',
	description: 'ID of the person to Blacklist',
	type: 'string'
      })
      .option('time', {
	alias: 't',
	description: 'Time of the blacklist',
	type: 'string'
      })
      .option('reason', {
	alias: 'm',
	description: 'The reason for blacklist',
	type: 'string'
      });

const blTimeDelta = timeNumbers(argv.time);
const blUserId = argv.id;
const blReason = argv.reason;


(async function(){
  if (blUserId == null || blReason == null || blTimeDelta == null){
    console.error('Insufficient arguments supplied'); 
  } else {
    const blUntilDate = new Date(+new Date() + blTimeDelta);
    
    const player = await Player.findByPk(blUserId);

    player.blacklist_reason = blReason;
    player.blacklisted_until = blUntilDate;
    await player.save();

    console.log(`Player ${player.name} (${player.id}) blacklisted until ${blUntilDate} successfully.`);
  }
}());
