const fse = require('fs-extra')
const path = require('path')
const json5 = require('json5')

module.exports = async id => {
  const raw = await fse.readFile(path.join(__dirname, '..', 'data', 'shorturls.json5'))
  const parsed = json5.parse(raw.toString())
  return parsed[id]
}
