const getPixels = require('get-pixels')
const savePixels = require('save-pixels')
const fse = require('fs-extra')
const debug = require('debug')('blogpage.io:tools:posterize')
const posterize = require('posterize')

module.exports = (source, output) => {
  return new Promise((resolve, reject) => {
    getPixels(source, (err, pixels) => {
      if (err) {
        debug(err)
        return reject()
      }
      const posterized = posterize(pixels, 3)
      savePixels(posterized, 'png').pipe(fse.createWriteStream(output))
      resolve()
    })
  })
}
