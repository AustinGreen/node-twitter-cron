let data = require("@begin/data");
let begin = require("@architect/functions"); // Reads & writes session data

exports.handler = async function http(request) {
  let followers = await data.get({
    table: "followers",
  });
  return {
    body: JSON.stringify(followers[0].followers),
  };
};
