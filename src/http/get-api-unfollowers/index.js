let data = require('@begin/data');

exports.handler = async function http(request) {
  let unfollowers = await data.get({
    table: 'data',
    key: 'unfollowers',
  });
  return {
    body: JSON.stringify(unfollowers ? unfollowers.items : []),
  };
};
