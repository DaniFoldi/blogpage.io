const fse = require('fs-extra')
const path = require('path')
const json5 = require('json5')

const get_authors = require('./get_authors')
const titlecase = require('./titlecase')

module.exports = async title => {
  const raw = await fse.readFile(path.join(__dirname, '..', 'data', 'metadata', title.toLowerCase().replace(' ', '-') + '.json5'))
  const parsed = json5.parse(raw.toString())
  const stats = await fse.stat(path.join(__dirname, '..', 'data', 'articles', title.toLowerCase().replace(' ', '-') + '.md'))
  if (typeof parsed.publish_date === 'undefined')
    parsed.publish_date = stats.birthtime
  if (typeof parsed.edit_date === 'undefined')
    parsed.edit_date = stats.mtime
  if (typeof parsed.title === 'undefined')
    parsed.title = titlecase(title.replace('-', ' '))
  parsed.file = title.toLowerCase().replace(' ', '-')
  parsed.authors = await get_authors(title)
  return parsed
}
