module.exports = (list, page, per_page) => {
  return list.slice((page - 1) * per_page, per_page)
}
