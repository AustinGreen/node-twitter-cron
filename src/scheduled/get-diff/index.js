// learn more about scheduled functions here: https://arc.codes/primitives/scheduled
exports.handler = async function scheduled(event) {
  console.log(JSON.stringify(event, null, 2));
  console.log("1 min");
  return;
};
