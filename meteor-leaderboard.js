PlayersList = new Meteor.Collection('players');

if(Meteor.isServer) {
  console.log('howdy on the server');

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
}

if(Meteor.isClient) {
  console.log('howdy on the client');

  Meteor.subscribe('thePlayers');

  Template.leaderboard.player = function(){
    var currentUserId = Meteor.userId();
    return PlayersList.find(
      {createdBy: currentUserId},
      {sort: {score: -1, name: 1}}
    );
  }

  Template.leaderboard.sessionValue = function(){
    return Session.get('selectedPlayer');
  }

  Template.leaderboard.selectedClass = function(){
    var selectedPlayer = Session.get('selectedPlayer');
    var playerId = this._id;

    if(selectedPlayer === playerId){
      return 'selected';
    }
  }

  Template.leaderboard.showSelectedPlayer = function(){
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayersList.findOne(selectedPlayer);
  }

  // events

  Template.addPlayerForm.events({
    'submit form': function(e, addFormTemplate){
      e.preventDefault();
      var playerName = addFormTemplate.find('#playerName').value;
      Meteor.call('insertPlayerData', playerName);
    }
  });

  Template.leaderboard.events({
    'click li.player': function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },
    'click #increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, 5);
    },
    'click #decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, -5);
    },
    'click #remove': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('removePlayer', selectedPlayer);
    }
  });
}
