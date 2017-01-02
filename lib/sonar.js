import { throttle } from "volve"

export default class Sonar {

  constructor(window) {
    this.window = window
  }

  ping(range, bottomFoundCallback, bottomLostCallback) {
    if (this._scroll) { return }

    let scroll = () => {
      if (this._withinRangeOfPageBottom(range)) {
        bottomFoundCallback()
      } else {
        bottomLostCallback()
      }
    }

    this._scroll = throttle(scroll, 50)
    this.window.addEventListener("scroll", this._scroll)
  }

  stop() {
    this.window.removeEventListener("scroll", this._scroll)
    this._scroll = null
  }

  _withinRangeOfPageBottom(range) {
    return this._viewportBottomScrollPosition >= this._pageHeight - range
  }

  get _pageHeight() {
    return this.window.document.body.offsetHeight
  }

  get _viewportBottomScrollPosition() {
    return this._viewportHeight + this._viewportTopScrollPosition
  }

  get _viewportTopScrollPosition() {
    return this.window.scrollY
  }

  get _viewportHeight() {
    return this.window.innerHeight
  }

}
