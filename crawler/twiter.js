
var Twit = require('twit')

var T = new Twit({
    consumer_key:         'vXaVn4jZ6Kx5jrsIk769Hb9gV'
  , consumer_secret:      'DuBR4ndQ6X9qIgFkfwHdOkI52JLBzbmqG5W3zNTFMha2u5LV1q'
  , access_token:         '2384827184-qRIWyOsmrPYooELlo0idhbkQQJP2wnf19u2kVRt'
  , access_token_secret:  'ZAOgyb6IYHXNFiTrkV6itwxp98pyfu4HpgMfKkVR1Yl2I'
})


//
//  search twitter for all tweets containing the word 'banana' since Nov. 11, 2011
//
T.get('search/tweets', { q: 'banana since:2013-11-11', count: 100 }, function(err, data, response) {
  console.log(data)
})

