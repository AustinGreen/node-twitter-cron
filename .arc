@app
begin-app

@http
get /api/followers
get /api/unfollowers
post /api/followers

@scheduled
get-diff cron(0/15 * * * *)

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
  