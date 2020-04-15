const updateUnfollowers = require('@architect/shared/updateUnfollowers');

// learn more about scheduled functions here: https://arc.codes/primitives/scheduled
exports.handler = async function scheduled(event) {
  return updateUnfollowers();
};
