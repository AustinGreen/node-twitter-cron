let data = require('@begin/data');
let arc = require('@architect/functions');
let auth = require('@architect/shared/auth');

let parseBody = arc.http.helpers.bodyParser;

async function write(request) {
  let body = parseBody(request);

  let followers = await data.set({
    table: 'data',
    key: 'followers',
    items: body,
  });
  return {
    statusCode: 201,
    body: JSON.stringify(followers),
  };
}

exports.handler = arc.http.async(auth, write);
