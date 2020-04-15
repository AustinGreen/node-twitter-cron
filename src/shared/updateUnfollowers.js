let data = require('@begin/data');
let Twit = require('twit');

const getFollowerIds = async () => {
  const T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET,
    timeout_ms: 60000,
  });

  return await T.get('followers/ids', {
    cursor: '-1',
    count: '5000',
    stringify_ids: true,
  })
    .catch(err => console.log('Error:', err.stack))
    .then(result => result.data.ids);
};

const diffPrevAndCurrent = (prev = [], curr = []) => prev.filter(f => !curr.includes(f));

module.exports = async function updateUnfollowers() {
  const prevFollowers = await data.get({
    table: 'data',
    key: 'followers',
  });

  const prevUnfollowers = await data.get({
    table: 'data',
    key: 'unfollowers',
  });

  const currFollowers = await getFollowerIds();

  // Update unfollower list with new unfollows
  await data.set({
    table: 'data',
    key: 'unfollowers',
    items: [
      ...((prevUnfollowers && prevUnfollowers.items) || []),
      ...diffPrevAndCurrent(prevFollowers.items, currFollowers),
    ],
  });

  // Update followers
  await data.set({
    table: 'data',
    key: 'followers',
    items: currFollowers,
  });

  const updatedUnfollowed = await data.get({
    table: 'data',
    key: 'unfollowers',
  });

  return {
    body: JSON.stringify(updatedUnfollowed.items),
  };
};
