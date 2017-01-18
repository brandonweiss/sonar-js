export default class Sonar {

  constructor(window) {
    this.window = window
    this.withinRangeOfPageBottom = undefined
  }

  ping(range, bottomFoundCallback, bottomLostCallback) {
    if (this._scroll) { return }

    this.withinRangeOfPageBottom = this._withinRangeOfPageBottom(range)

    if (this.withinRangeOfPageBottom) {
      bottomFoundCallback()
    } else {
      bottomLostCallback()
    }

    this._scroll = () => {
      if (this._enteringRangeOfPageBottom(range)) {
        this.withinRangeOfPageBottom = true
        bottomFoundCallback()
      } else if (this._leavingRangeOfPageBottom(range)) {
        this.withinRangeOfPageBottom = false
        bottomLostCallback()
      }
    }

    this.window.addEventListener("scroll", this._scroll)
  }

  stop() {
    this.window.removeEventListener("scroll", this._scroll)
    this._scroll = null
  }

  _withinRangeOfPageBottom(range) {
    return this._viewportBottomScrollPosition >= this._pageHeight - range
  }

  _enteringRangeOfPageBottom(range) {
    return this.withinRangeOfPageBottom === false && this._withinRangeOfPageBottom(range)
  }

  _leavingRangeOfPageBottom(range) {
    return this.withinRangeOfPageBottom === true && !this._withinRangeOfPageBottom(range)
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
