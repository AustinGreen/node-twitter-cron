@app
begin-app

@http
get /api/followers
get /api/unfollowers
post /api/followers
put /api/unfollowers

@scheduled
get-diff cron(0/15 * * * *)

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
  