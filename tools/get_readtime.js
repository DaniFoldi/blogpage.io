module.exports = content => {
  return Math.ceil(content.split(' ').length / 200)
}
