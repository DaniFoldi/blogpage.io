const debug = require('debug')('blogpage.io:tools:get_related_blogs')
const fetch = require('node-fetch')

module.exports = async (blogs, blog_name) => {
  const blog_data = []
  for (let blog of blogs) {
    try {
      const data = await fetch(`${blog}/api/related-information`, {
        headers: {
          "X-Blogpage": blog_name
        }
      })
      const body = await data.json()
      blog_data.push(body)
    } catch (error) {
      debug(error)
    }
  }
  return blog_data
}
