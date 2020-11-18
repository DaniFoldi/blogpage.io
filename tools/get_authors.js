const fse = require('fs-extra')
const path = require('path')
const json5 = require('json5')

const get_author = require('./get_author')
const titlecase = require('./titlecase')

module.exports = async title => {
  const raw = await fse.readFile(path.join(__dirname, '..', 'data', 'metadata', title.toLowerCase().replace(' ', '-') + '.json5'))
  const parsed = json5.parse(raw.toString())
  const authors = []
  for (let author of parsed.authors) {
    const author_data = await get_author(author)
    authors.push(author_data)
  }
  return authors
}
