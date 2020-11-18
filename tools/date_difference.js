const datetimeDifference = require('datetime-difference')
const pluralize = require('pluralize')

module.exports = (date1, date2) => {
  if (!date2) date2 = new Date()

  const difference = datetimeDifference(date1, date2)
  let mostRelevant = 0
  while (Object.values(difference)[mostRelevant] === 0) mostRelevant++
  const relative = date1 < date2 ? 'ago' : 'left'
  const diffText = `${pluralize(Object.keys(difference)[mostRelevant], Object.values(difference)[mostRelevant], true)} ${relative}`
  if (diffText === '1 day ago') return 'yesterday'
  if (diffText === '1 day left') return 'tomorrow' //todo more humanly output
  if (diffText.indexOf('milliseconds') !== -1 && relative === 'ago') return 'just now'
  return diffText
}
