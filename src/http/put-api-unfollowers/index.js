const updateUnfollowers = require('@architect/shared/updateUnfollowers');

exports.handler = async function http(req) {
  return updateUnfollowers();
};
