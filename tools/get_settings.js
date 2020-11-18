const fse = require('fs-extra')
const path = require('path')
const json5 = require('json5')

module.exports = async () => {
  const raw = await fse.readFile(path.join(__dirname, '..', 'data', 'settings.json5'))
  return json5.parse(raw.toString())
}
