let data = require('@begin/data');

exports.handler = async function http(request) {
  let followers = await data.get({
    table: 'data',
    key: 'followers',
  });
  return {
    body: JSON.stringify(followers.items),
  };
};
