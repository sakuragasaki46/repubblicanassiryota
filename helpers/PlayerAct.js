class PlayerAct {
  constructor(pl, endXpReward) {
    this.player = pl;
    this.endXpReward = endXpReward;
  }
  
  enter (){
    if (this.player.isBlacklisted()) {
      throw new Error('Player is blacklisted');
    }

    return this.player;
  }

  exit (error) {
    if (!error) {
      this.player.addExperience(this.endXpReward);
      await this.player.touch();
    }
  }
};

module.exports = PlayerAct;
