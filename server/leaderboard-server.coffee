root = global

root.Meteor.publish 'thePlayers', ->
  currentUserId = @userId
  root.PlayersList.find(createdBy: currentUserId)

root.Meteor.methods
  'insertPlayerData': (playerName) ->
    currentUserId = root.Meteor.userId()
    root.PlayersList.insert
      name: playerName
      score: 0
      createdBy: currentUserId
  'removePlayer': (selectedPlayer) ->
    root.PlayersList.remove(selectedPlayer)
  'modifyPlayerScore': (selectedPlayer, scoreValue) ->
    root.PlayersList.update({_id: selectedPlayer}, {$inc: {score: scoreValue}})