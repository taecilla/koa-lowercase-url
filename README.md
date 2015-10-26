Koa middleware that redirects all requests to an URL with uppercase letters to the same URL in lowercase, ignoring the query string (key and value).

## Usage

	const app = require('koa')()
	app.use(reuire('koa-to-lowercase'))
	app.use(function *(next) {
	   this.response.body = 'If this URL had uppercase letters before the ? now they are in lowercase.'
	})
	app.listen(8000)

## Related module

[koa-no-trailing-slash](https://www.npmjs.com/package/koa-no-trailing-slash)
