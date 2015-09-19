module.exports = function lowercaseUrl() {
	return function *(next) {
		var url = this.request.url
		yield next
		if (/[A-Z]/.test(url)) {
			this.status = 301
			this.response.redirect(url.toLowerCase());
		}
	}
}()
