const fse = require('fs-extra')
const render_article = require('./render_article')
const path = require('path')

module.exports = async title => {
  const raw = await fse.readFile(path.join(__dirname, '..', 'data', 'articles', title.toLowerCase().replace(' ', '-') + '.md'))
  return render_article(raw.toString())
}
