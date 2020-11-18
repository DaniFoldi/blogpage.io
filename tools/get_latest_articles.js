const fse = require('fs-extra')
const path = require('path')

const get_all_article_data = require('./get_all_article_data')

module.exports = async count => {
  let all_metadata = await get_all_article_data()
  all_metadata = all_metadata.filter(el => el.show_in_feed)
  all_metadata.sort((a, b) => b.publish_date - a.publish_date)
  return all_metadata.slice(0, count)
}
