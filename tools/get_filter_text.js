const pluralize = require('pluralize')

module.exports = (locale, count, action, label) => {
  if (count === 0)
    return `${locale.no_articles} ${action} ${label} ${locale.found}`
  return `${locale.showing} ${count} ${pluralize(locale.article, count)} ${action} ${label}`
}
