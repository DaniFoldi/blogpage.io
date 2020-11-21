const markdownIt = require('markdown-it')
// const markdownItColor = require('markdown-it-color')
const markdownItEmoji = require('markdown-it-emoji')
const markdownItPrism = require('markdown-it-prism')
const markdownItSpoiler = require('@traptitech/markdown-it-spoiler')
const mention = require('./markdown/markdown-it-mention')
const articlelink = require('./markdown/markdown-it-articlelink')
const markdownItSub = require('markdown-it-sub')
const markdownItSup = require('markdown-it-sup')
const markdownItKbd = require('markdown-it-kbd')
const markdownItMark = require('markdown-it-mark')
const markdownItUnderline = require('markdown-it-underline')
const markdownItFootnote = require('markdown-it-footnote')
const markdownItAbbr = require('markdown-it-abbr')
const markdownItTaskLists = require('markdown-it-task-lists')
const markdownItCollapsible = require('markdown-it-collapsible')
//const markdownItHtml5Media = require('@gerhobbelt/markdown-it-html5-media')
const markdownItImsize = require('markdown-it-imsize')
const markdownItKatex = require('markdown-it-katex')
const markdownItFigure = require('markdown-it-figure')
const markdownItDeflist = require('markdown-it-deflist')
//const markdownItContainer = require('markdown-it-container')
const markdownItHashtag = require('markdown-it-hashtag')
const markdownItCustomBlock = require('markdown-it-custom-block')
const gallery = require('./markdown/markdown-it-gallery')

const twemoji = require('twemoji')

//TODO:, spoiler, articlelink, embed, mention, cite, table of contents, checklist,
// blockquote, blockspoiler, syntax highlighting, definitions

const md = markdownIt({
  breaks: true,
  linkify: true,
  typographer: true
})

md.use(markdownItSpoiler)
md.use(markdownItSub)
md.use(markdownItSup)
md.use(markdownItKbd)
md.use(markdownItMark)
md.use(markdownItUnderline)
md.use(markdownItEmoji)
//md.use(markdownItHtml5Media)
md.use(markdownItFootnote)
md.use(markdownItAbbr)
md.use(markdownItTaskLists)
md.use(markdownItCollapsible)
md.use(markdownItPrism)
md.use(markdownItImsize)
md.use(markdownItHashtag)
md.use(markdownItDeflist)
md.use(markdownItKatex)
md.use(markdownItFigure)
//md.use(markdownItContainer)
md.use(mention)
md.use(articlelink)
md.use(gallery)
md.use(markdownItCustomBlock, {
  spotify(id) {
    return `<div class='embed embed-spotify'><iframe src="https://open.spotify.com/embed/album/${id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`
  },
  youtube(id) {
    return `<div class='embed embed-youtube'><iframe type="text/html" referrerpolicy="no-referrer" src="https://www.youtube.com/embed/${id}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>`
  },
  twitter(id) {
    return `<div class='embed embed-twitter'><iframe type="text/html" referrerpolicy="no-referrer" src="/embeds/twitter.html#${id}" frameborder="0"></iframe></div>`
  },
  applemusic(link) {
    return `<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="${link}"></iframe>`
  },
  instagram(id) {
    return `<div class='embed embed-instagram'><iframe type="text/html" referrerpolicy="no-referrer" src="/embeds/instagram.html#${id}" frameborder="0"></iframe></div>`
  },
  gauge(data) {
    const rating = data.split(',')[0]
    const caption = data.substr(rating.length + 1).trim()
    return `<div class='gauge-container'><div class='gauge-background'><div class='gauge gauge-${rating}'><div class='gauge-max-background'><div class='gauge gauge-max'><p class='gauge-rating'><b>${rating}</b>/10</p></div></div></div></div><p class='gauge-caption'>${caption}</p></div>`
  },
  embed(link) {
    return `<div class='embed embed-custom' data-src='${link}'><iframe type="text/html" referrerpolicy="no-referrer" frameborder="0" sandbox="allow-forms allow-popups allow-scripts" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>`
  },
  codesandbox(id) {
    return `<div class='embed embed-codesandbox'><iframe src="https://codesandbox.io/embed/${id}?fontsize=14&hidenavigation=1&theme=light"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe></div>`
  }
})

md.renderer.rules.emoji = (token, idx) => {
  return twemoji.parse(token[idx].content)
}

module.exports = text => {
  return md.render(text)
}
