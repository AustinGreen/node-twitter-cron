@app
begin-app

@http
get /api/list
post /api/list

@scheduled
get-diff cron(0/15 * * * *)

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
  