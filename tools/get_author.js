const debug = require('debug')('blogpage.io:tools:get_author')
const fse = require('fs-extra')
const path = require('path')
const json5 = require('json5')

module.exports = async author => {
  const raw = await fse.readFile(path.join(__dirname, '..', 'data', 'authors', author.toLowerCase().replace(' ', '-') + '.json5'))
  const parsed = json5.parse(raw.toString())
  return parsed
}
