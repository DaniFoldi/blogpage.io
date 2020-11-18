const get_author = require('./get_author')
const get_metadata = require('./get_metadata')

module.exports = async settings => {
  const header_left_data = await Promise.all(settings.header_left.map(async el => {
    return el.category ? {
      category_name: el.category,
      subcategories: settings.categories.find(s => s.category_name == el.category).subcategories.map(sc => {
        return {
          topics: sc.topics.map(t => {
            return {
              topic_name: t.topic_name,
              subcategory_name: sc.subcategory_name,
              category_name: el.category
            }
          }),
          subcategory_name: sc.subcategory_name,
          category_name: el.category
        }
      })
    } : el.article ? {
      article: el.article,
      title: (await get_metadata(el.article)).title
    } : el.author ? {
      name: (await get_author(el.author)).name,
      author: el.author
    } : el.link ? {
      link: el.link,
      title: el.title
    } : el
  }))
  return header_left_data
}
