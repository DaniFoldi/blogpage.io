const fse = require('fs-extra')
const path = require('path')

module.exports = async (articles, filters) => {
  for (let filter of filters) {
    const filterType = Object.keys(filter)[0]
    const filterValue = filter[filterType]
    switch (filterType) {
      case 'author':
        articles = articles.filter(article => article.authors.find(author => author.name.indexOf(filterValue) !== -1) !== undefined)
        break
      case 'content':
        articles = articles.filter(article => article._article.indexOf(filterValue) !== -1)
        break
      case 'tag':
        articles = articles.filter(article => article.tags.indexOf(filterValue) !== -1)
        break
      case 'category':
        break
      case 'any':
        break
    }
  }
  return articles
}
