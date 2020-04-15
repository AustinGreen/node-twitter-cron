let data = require('@begin/data');
let arc = require('@architect/functions');
let auth = require('@architect/shared/auth');

async function read(request) {
  let followers = await data.get({
    table: 'data',
    key: 'followers',
  });
  return {
    body: JSON.stringify(followers ? followers.items : []),
  };
}

exports.handler = arc.http.async(auth, read);
