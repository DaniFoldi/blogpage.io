window.onerror = async (message, source, line, column, error) => {
  await fetch('/error', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message,
      source,
      line,
      column,
      error
    })
  })
}

breaking = []

document.querySelectorAll('span.spoiler').forEach(el => el.addEventListener('click', async () => {
  el.classList.add('shown')
  el.removeAttribute('title')
}))

function getCookie(name) {
  return `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift()
}

document.querySelector('#search input').value = ''
if (!getCookie('cookiesAccepted')) {
  breaking.unshift('This website uses cookies. By continuing to browse you accept this.')
}

document.querySelector('#search input').addEventListener('keydown', async event => {
  if (event.key === 'Enter') {
    location.href = `/search/${event.target.value}`
  }
})

document.querySelector('#search button').addEventListener('click', async () => {
  if (document.querySelector('#search input').classList.contains('open') && document.querySelector('#search input').value !== '') {
    location.href = `/search/${document.querySelector('#search input').value}`
  }
  document.querySelector('#search input').classList.toggle('open')
})

addEventListener('scroll', async () => {
  document.querySelector('nav').classList.toggle('dense', document.documentElement.scrollTop >= document.querySelector('header').offsetHeight)
}, {
  passive: true
})

document.querySelectorAll('.embed-custom').forEach(el => el.addEventListener('click', async event => {
  if (event.target.querySelector('iframe').src === '') {
    event.target.querySelector('iframe').src = event.target.getAttribute('data-src')
  }
}))

addEventListener('click', async event => {
  if (!event.target) return
  if (event.target.nodeName !== 'LI') return
  if (!event.target.getAttribute('data-href')) return

  location.href = event.target.getAttribute('data-href')
}, true)

if (typeof iFrameResize !== 'undefined') {
  console.log('Resizing embeds')
  iFrameResize({}, '.embed-instagram iframe, .embed-twitter iframe')
}

document.querySelectorAll('pre').forEach(el => {
  const button = document.createElement('button')
  button.classList.add('copy')
  button.textContent = 'Copy'
  button.addEventListener('click', event => {
    const code = el.querySelector('code')
    navigator.clipboard.writeText(code.textContent)
    button.textContent = 'Copied!'
    setTimeout(() => {
      button.textContent = 'Copy'
    }, 1200)
  })
  el.insertBefore(button, el.firstChild)
})
