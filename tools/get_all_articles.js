const fse = require('fs-extra')
const path = require('path')

module.exports = async () => {
  const files = await fse.readdir(path.join(__dirname, '..', 'data', 'articles'))
  return files.filter(file => file.endsWith('.md'))
}
