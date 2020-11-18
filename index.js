const express = require('express')
const debug = require('debug')('blogpage.io:main')
const bodyParser = require('body-parser')
const hogan = require('hogan-express')
const path = require('path')
const packagejson = require('packagejson')
const compareVersions = require('compare-versions')

;
(async () => {
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  require('./tools/client_errors')(app)
  const get_article = require('./tools/get_article')
  const get_metadata = require('./tools/get_metadata')
  const settings = await require('./tools/get_settings')()
  const locale = await require('./tools/get_locale')()
  const short_urls = require('./tools/short_urls')
  const get_latest_articles = require('./tools/get_latest_articles')
  const get_readtime = require('./tools/get_readtime')
  const posterize = require('./tools/posterize')
  const date_difference = require('./tools/date_difference')
  const titlecase = require('./tools/titlecase')
  const related_blog_data = await require('./tools/generate_related_blogs')(settings.related_blogs, settings.blog_name)
  const get_header_left_data = require('./tools/get_header_left_data')
  const get_header_right_data = require('./tools/get_header_right_data')
  const get_all_article_data = require('./tools/get_all_article_data')
  const filter_articles = require('./tools/filter_articles')
  const get_filter_text = require('./tools/get_filter_text')
  const paginate = require('./tools/paginate')

  app.use(express.static('public'))
  app.use(express.static('assets'))
  app.use('/prism', express.static('node_modules/prismjs')) //todo only necessary files
  app.use('/iframe-resizer', express.static('node_modules/iframe-resizer/js')) //todo only necessary files

  app.engine('mst', hogan)
  app.set('view engine', 'mst')
  //app.enable('view cache')
  app.set('x-powered-by', settings.x_powered_by_express)
  app.set('views', path.join(__dirname, 'templates'))

  /*app.get('/test', async (req, res, next) => {
    const output = path.join(__dirname, 'assets', 'images', 'test.png')
    await posterize(path.join(__dirname, 'assets', 'images', 'photo.jpeg'), output)
    res.sendFile(output)
  })*/ //todo config posterized profile picture

  app.get('/api/related-information', async (req, res, next) => {
    res.json({
      url: settings.main_url,
      icon: settings.logo,
      name: settings.blog_name,
      'blogpage.io': packagejson.version
    })
    debug(`${req.get('X-Blogpage')} just queried this blog's data`)
  })

  app.get('/tags/:tag', async (req, res, next) => {
    const articles = await filter_articles(await get_all_article_data(), [{
      tag: req.params.tag
    }])
    const header_left_data = await get_header_left_data(settings)
    const header_right_data = await get_header_right_data(settings)
    res.render('main', {
      partials: {
        header: 'header',
        footer: 'footer',
        list: 'list'
      },
      filter_results: await get_filter_text(locale, articles.length, locale.tagged, req.params.tag),
      locale,
      settings,
      articles,
      header_left: header_left_data,
      header_right: header_right_data,
      related_blogs: related_blog_data,
      lambdas: {
        show_related: text => {
          if (!settings.show_related) return ''
          return text
        },
        linkify: text => {
          return text.replace(/\s/g, '-')
        }
      }
    })
  })

  app.get('/search/:query', async (req, res, next) => {
    const articles = await filter_articles(await get_all_article_data(), [{
      any: req.params.query
    }])
    const header_left_data = await get_header_left_data(settings)
    const header_right_data = await get_header_right_data(settings)
    res.render('main', {
      partials: {
        header: 'header',
        footer: 'footer',
        list: 'list'
      },
      filter_results: await get_filter_text(locale, articles.length, locale.matching_search, req.params.query),
      locale,
      settings,
      articles,
      header_left: header_left_data,
      header_right: header_right_data,
      related_blogs: related_blog_data,
      lambdas: {
        show_related: text => {
          if (!settings.show_related) return ''
          return text
        },
        linkify: text => {
          return text.replace(/\s/g, '-')
        }
      }
    })
  })

  app.get('/authors/:author', async (req, res, next) => {
    const articles = await filter_articles(await get_all_article_data(), [{
      author: req.params.author
    }])
    const header_left_data = await get_header_left_data(settings)
    const header_right_data = await get_header_right_data(settings)
    res.render('main', {
      partials: {
        header: 'header',
        footer: 'footer',
        list: 'list'
      },
      filter_results: await get_filter_text(locale, articles.length, locale.written_by, req.params.author),
      locale,
      settings,
      articles,
      header_left: header_left_data,
      header_right: header_right_data,
      related_blogs: related_blog_data,
      lambdas: {
        show_related: text => {
          if (!settings.show_related) return ''
          return text
        },
        linkify: text => {
          return text.replace(/\s/g, '-')
        }
      }
    })
  })

  app.get('/', async (req, res, next) => {
    const articles = await get_latest_articles(10)
    const header_left_data = await get_header_left_data(settings)
    const header_right_data = await get_header_right_data(settings)
    res.render('main', {
      partials: {
        header: 'header',
        footer: 'footer',
        list: 'list'
      },
      locale,
      settings,
      articles,
      header_left: header_left_data,
      header_right: header_right_data,
      related_blogs: related_blog_data,
      lambdas: {
        show_related: text => {
          if (!settings.show_related) return ''
          return text
        },
        linkify: text => {
          return text.replace(/\s/g, '-')
        }
      }
    })
  })

  app.get('/articles/:article', async (req, res, next) => {
    const content = await get_article(req.params.article)
    const metadata = await get_metadata(req.params.article)
    const header_left_data = await get_header_left_data(settings)
    const header_right_data = await get_header_right_data(settings)
    res.render('read', {
      content,
      tags_displayed: metadata.tags.map(el => {
        return {
          name: el
        }
      }),
      date: titlecase(date_difference(metadata.publish_date), true),
      update: !settings.showupdates || metadata.publish_date === metadata.edit_date ? undefined : `Updated ${date_difference(metadata.edit_date)}`,
      settings,
      locale,
      ...metadata,
      article_title: metadata.title,
      partials: {
        header: 'header',
        footer: 'footer',
        displayed: 'article'
      },
      readtime: await get_readtime(content),
      header_left: header_left_data,
      header_right: header_right_data,
      related_blogs: related_blog_data,
      lambdas: {
        show_related: text => {
          if (!settings.show_related) return ''
          return text
        },
        linkify: text => {
          return text.replace(/\s/g, '-')
        }
      }
    })
  })

  app.get('/jump/:id', async (req, res, next) => {
    const url = await short_urls(req.params.id)
    if (!url)
      return next()
    res.location(url).sendStatus(301)

  })

  app.get('/latest', async (req, res, next) => {
    const latest = await get_latest_articles(5)
    res.send(latest)
  })

  app.use(async (req, res) => {
    const header_left_data = await get_header_left_data(settings)
    const header_right_data = await get_header_right_data(settings)
    res.render('main', {
      page_title: settings.page_title,
      partials: {
        header: 'header',
        footer: 'footer',
        list: 'error'
      },
      locale,
      settings,
      header_left: header_left_data,
      header_right: header_right_data,
      related_blogs: related_blog_data,
      lambdas: {
        show_related: text => {
          if (!settings.show_related) return ''
          return text
        },
        linkify: text => {
          return text.replace(/\s/g, '-')
        }
      }
    })
  })

  app.listen(settings.port, async () => {
    debug(`Running on port ${settings.port}`)
  })
})()
