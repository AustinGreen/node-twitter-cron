let data = require('@begin/data');
let auth = require('@architect/shared/auth');
let arc = require('@architect/functions');

async function read(request) {
  let unfollowers = await data.get({
    table: 'data',
    key: 'unfollowers',
  });
  return {
    body: JSON.stringify(unfollowers ? unfollowers.items : []),
  };
}

exports.handler = arc.http.async(auth, read);
