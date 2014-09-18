root = window

root.Meteor.subscribe('thePlayers')

root.Template.leaderboard.player = ->
  currentUserId = root.Meteor.userId()
  root.PlayersList.find({createdBy: currentUserId}, {sort: {score: -1, name: 1}})

root.Template.leaderboard.sessionValue = ->
  root.Session.get('selectedPlayer')

root.Template.leaderboard.selectedClass = ->
  selectedPlayer = root.Session.get('selectedPlayer')
  playerId = this._id
  if selectedPlayer == playerId
    'selected'

root.Template.leaderboard.showSelectedPlayer = ->
  selectedPlayer = root.Session.get('selectedPlayer')
  root.PlayersList.findOne(selectedPlayer)

# events

root.Template.addPlayerForm.events
  'submit form': (e, addFormTemplate) ->
    e.preventDefault()
    playerName = addFormTemplate.find('#playerName').value
    root.Meteor.call('insertPlayerData', playerName)

root.Template.leaderboard.events
  'click li.player': ->
    playerId = this._id
    root.Session.set('selectedPlayer', playerId)
  'click #increment': ->
    selectedPlayer = root.Session.get('selectedPlayer')
    root.Meteor.call('modifyPlayerScore', selectedPlayer, 5)
  'click #decrement': ->
    selectedPlayer = root.Session.get('selectedPlayer')
    root.Meteor.call('modifyPlayerScore', selectedPlayer, -5)
  'click #remove': ->
    selectedPlayer = root.Session.get('selectedPlayer')
    root.Meteor.call('removePlayer', selectedPlayer)
