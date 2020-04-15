const updateUnfollowers = require('@architect/shared/updateUnfollowers');
let auth = require('@architect/shared/auth');
let arc = require('@architect/functions');

async function write() {
  return updateUnfollowers();
}

exports.handler = arc.http.async(auth, write);
