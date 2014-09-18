Meteor.publish('thePlayers', function(){
  var currentUserId = this.userId;
  return PlayersList.find({ createdBy: currentUserId });
});

Meteor.methods({
  'insertPlayerData': function(playerName){
    var currentUserId = Meteor.userId();
    PlayersList.insert({
      name: playerName,
      score: 0,
      createdBy: currentUserId
    });
  },
  'removePlayer': function(selectedPlayer){
    PlayersList.remove(selectedPlayer);
  },
  'modifyPlayerScore': function(selectedPlayer, scoreValue){
    PlayersList.update(
      {_id: selectedPlayer},
      {$inc: {score: scoreValue}}
    );
  }
});