let lastNav = 'Home'

function onNavigation(event) {
  const newNav = event.target.textContent
  if (lastNav !== newNav) {
    lastNav = newNav
    changeActive(newNav)
    changeContent(newNav)
  }
}

function changeActive(nav) {
  const navItems = document.getElementById('nav').children
  Array.prototype.forEach.call(navItems, item => {
    if (item.textContent === nav) {
      item.setAttribute('data-active', 'true')
    } else {
      item.setAttribute('data-active', 'false')
    }
  })
}

function changeContent(nav) {
  const containers = document.querySelectorAll('.container')
  containers.forEach(container => {
    if (container.getAttribute('data-nav') === nav) {
      container.style.display = 'flex'
    } else {
      container.style.display = 'none'
    }
  })
}

function handleClick() {
  const navItems = document.getElementById('nav').children
  Array.prototype.forEach.call(navItems, item => {
    item.addEventListener('click', onNavigation)
  })
}

window.addEventListener('load', handleClick)
