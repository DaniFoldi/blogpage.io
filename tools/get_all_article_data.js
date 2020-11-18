const fse = require('fs-extra')
const path = require('path')

const get_all_articles = require('./get_all_articles')
const get_metadata = require('./get_metadata')
const get_article = require('./get_article')
const get_readtime = require('./get_readtime')

module.exports = async () => {
  const files = await get_all_articles()
  let all_metadata = []
  for (let file of files) {
    const article_path = file.split(path.sep)
    const article_title = article_path[article_path.length - 1].split('.')
    article_title.pop()
    const metadata = await get_metadata(article_title.join('.'))
    metadata.article_link = `/articles/${article_title.join('.')}`
    metadata._article = await get_article(metadata.file)
    metadata.readtime = await get_readtime(metadata._article)
    all_metadata.push(metadata)
  }
  return all_metadata
}
