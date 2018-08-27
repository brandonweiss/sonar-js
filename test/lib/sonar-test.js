import test from "ava"
import { JSDOM } from "jsdom"
import Sonar from "../../lib/sonar"

let createWindow = (options = {}) => {
  let dom = new JSDOM("<html><body></body></html>")
  let window = dom.window

  Object.defineProperties(window.HTMLElement.prototype, {
    offsetHeight: {
      get: () => options.pageHeight
    },
  })

  window.innerHeight = options.windowHeight

  return window
}

let scrollTo = (window, scrollY) => {
  window.scrollY = scrollY
  let event = new window.Event("scroll")
  window.dispatchEvent(event)
}

test("fires the entering callback when entering range of the bottom", (t) => {
  t.plan(1)

  let window = createWindow({
    pageHeight: 400,
    windowHeight: 200
  })

  let sonar = new Sonar(window)

  sonar.ping(100, () => {
    t.pass()
  })

  scrollTo(window, 0)
  scrollTo(window, 300)
})

test("fires the leaving callback when leaving range of the bottom", (t) => {
  t.plan(2)

  let window = createWindow({
    pageHeight: 400,
    windowHeight: 200
  })

  scrollTo(window, 300)

  let sonar = new Sonar(window)

  sonar.ping(100, () => {
    t.pass()
  }, () => {
    t.pass()
  })

  scrollTo(window, 0)
})

test("should only fire the entering callback once when within range of the page bottom", (t) => {
  t.plan(1)

  let window = createWindow({
    pageHeight: 400,
    windowHeight: 200
  })

  scrollTo(window, 0)

  let sonar = new Sonar(window)

  sonar.ping(100, () => {
    t.pass()
  })

  scrollTo(window, 300)
  scrollTo(window, 350)
})

test("should only fire the leaving callback once when not within range of the page bottom", (t) => {
  t.plan(1)

  let window = createWindow({
    pageHeight: 400,
    windowHeight: 200
  })

  scrollTo(window, 300)

  let sonar = new Sonar(window)

  sonar.ping(100, () => {}, () => {
    t.pass()
  })

  scrollTo(window, 0)
  scrollTo(window, 0)
})

test("fires the entering callback if already within range of the bottom when setup", (t) => {
  t.plan(1)

  let window = createWindow({
    pageHeight: 400,
    windowHeight: 200
  })

  scrollTo(window, 300)

  let sonar = new Sonar(window)

  sonar.ping(100, () => {
    t.pass()
  })
})

test("fires the leaving callback if already not within range of the bottom when setup", (t) => {
  t.plan(1)

  let window = createWindow({
    pageHeight: 400,
    windowHeight: 200
  })

  scrollTo(window, 0)

  let sonar = new Sonar(window)

  sonar.ping(100, () => {}, () => {
    t.pass()
  })
})

test("if there is no leaving callback when leaving and re-entering the entering callback will never fire again", (t) => {
  t.plan(1)

  let window = createWindow({
    pageHeight: 400,
    windowHeight: 200
  })

  scrollTo(window, 0)

  let sonar = new Sonar(window)

  sonar.ping(100, () => {
    t.pass()
  })

  scrollTo(window, 300)
  scrollTo(window, 0)
  scrollTo(window, 300)
})

test("if starting within range of page bottom with no leaving callback the entering callback should fire and then never fire again", (t) => {
  t.plan(1)

  let window = createWindow({
    pageHeight: 400,
    windowHeight: 200
  })

  scrollTo(window, 300)

  let sonar = new Sonar(window)

  sonar.ping(100, () => {
    t.pass()
  })

  scrollTo(window, 0)
  scrollTo(window, 300)
})
