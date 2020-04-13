let data = require("@begin/data");
let arc = require("@architect/functions"); // Reads & writes session data
let parseBody = arc.http.helpers.bodyParser;

exports.handler = async function http(request) {
  let body = parseBody(request);

  let followers = await data.set({
    table: "followers",
    followers: body,
  });
  return {
    statusCode: 201,
    body: JSON.stringify(followers),
  };
};
