root = global ? window

# assert = require('assert')

# suite 'PlayerList', ->
#   test 'in the server', (done, server) ->
#     server.eval ->
#       root.PlayersList.insert 
#         name: 'Testy'
#         score: 100
#       docs = root.PlayersList.find().fetch()
#       emit('docs', docs)

#     server.once 'docs', (docs) ->
#       assert.equal(docs.length, 1)
#       done()

module.exports =
  "Demo test Google" : (browser) ->
    browser
      .url("http://www.google.com")
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'nightwatch')
      .waitForElementVisible('button[name=btnG]', 1000)
      .click('button[name=btnG]')
      .pause(1000)
      .assert.containsText('#main', 'The Night Watch')
      .end()
