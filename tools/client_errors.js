const debug = require('debug')('blogpage.io:client:error')

module.exports = app => {
  app.post('/error', async (req, res, next) => {
    const column = req.body.column || req.body.error.column
    const line = req.body.line || req.body.error.line
    const file = req.body.source || req.body.error.sourceURL
    const message = req.body.message
    debug(`${file}:${line}:${column} ${message}`)
    res.sendStatus(200)
  })
}
