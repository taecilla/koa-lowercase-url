'use strict'

module.exports = function lowercaseUrl() {
	return function *(next) {
		var url = this.request.url
		if (/[A-Z]/.test(url)) {
			this.response.status = 301
			this.response.redirect(url.toLowerCase());
			return
		}
		yield next
	}
}()
