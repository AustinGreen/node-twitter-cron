module.exports = async function auth(req) {
  if (req.headers.token !== process.env.API_KEY) {
    return {
      statusCode: 403,
      json: {
        error: 'not_authorized',
        message: 'API key is invalid',
      },
    };
  }
};
