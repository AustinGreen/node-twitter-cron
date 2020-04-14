// learn more about scheduled functions here: https://arc.codes/primitives/scheduled
const getFollowerIds = async () => {
  const T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET,
    timeout_ms: 60000,
  });

  await T.get('followers/ids', {
    cursor: '-1',
    count: '5000',
    stringify_ids: true,
  })
    .catch(err => console.log('Error:', err.stack))
    .then(result => result.data.ids);
};

const diffPrevAndCurrent = (prev = [], curr = []) => prev.filter(f => !curr.includes(f));

exports.handler = async function scheduled(event) {
  const prevFollowers = await data.get({
    table: 'followers',
  })?.[0]?.followers;

  const currFollowers = await getFollowerIds();

  // Update unfollower list with new unfollows
  await data.set({
    table: 'data',
    key: 'unfollowers',
    items: [
      ...(await data.get({
        table: 'data',
        key: 'unfollowers',
      })?.items),
      ...diffPrevAndCurrent(prevFollowers, currFollowers),
    ],
  });

  // Update followers
  await data.set({
    table: 'data',
    key: 'followers',
    items: currFollowers,
  });
  return;
};
