module.exports = (text, onlyfirst = false) => {
  if (onlyfirst) return text.charAt(0).toUpperCase() + text.substr(1)
  return text.toLowerCase().split(' ').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')
}
