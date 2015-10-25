'use strict'

module.exports = function lowercaseUrl() {
	return function *(next) {
		const href = this.request.href

		let url = href,
			queryString = ''

		const queryStart = href.indexOf('?')
		if (queryStart > 0) {
			url = href.slice(0, queryStart)
			queryString = href.slice(queryStart)
		}

		if (/[A-Z]/.test(url)) {
			this.response.status = 301
			this.response.redirect(url.toLowerCase() + queryString)
			return
		}
		yield next
	}
}()
