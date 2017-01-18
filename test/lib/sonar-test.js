import test from "ava"
import jsdom from "jsdom"
import Sonar from "../../lib/sonar"

let createWindow = (options = {}) => {
  let document = jsdom.jsdom("<html><body></body></html>")
  let window = document.defaultView

  window.document.body.offsetHeight = options.pageHeight
  window.innerHeight = options.windowHeight

  return window
}

let scrollTo = (window, scrollY) => {
  window.scrollY = scrollY
  let event = new window.Event("scroll")
  window.dispatchEvent(event)
}

test("fires a callback when entering range of the bottom", async (t) => {
  t.plan(1)

  let window = createWindow({
    pageHeight: 400,
    windowHeight: 200
  })

  let sonar = new Sonar(window)

  sonar.ping(100, () => {
    t.pass()
  }, () => {})

  scrollTo(window, 0)

  await new Promise(resolve => window.setTimeout(resolve, 50))

  scrollTo(window, 300)
})

test("fires a callback when leaving range of the bottom", async (t) => {
  t.plan(2)

  let window = createWindow({
    pageHeight: 400,
    windowHeight: 200
  })

  let sonar = new Sonar(window)

  sonar.ping(100, () => {
    t.pass()
  }, () => {
    t.pass()
  })

  scrollTo(window, 300)

  await new Promise(resolve => window.setTimeout(resolve, 50))

  scrollTo(window, 0)
})
