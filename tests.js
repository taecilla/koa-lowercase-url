'use strict'

const port = 8000

const app = require('koa')()
const assert = require('assert')
const curl = require('curlrequest')
const randomString = require('randomstring')

app.use(require('./index.js'))

app.use(function *(next) {
	this.response.body = 'Here is where the response body goes.\n\n'
})

app.listen(port)

const getStatusCode = (response) => {
	response = response.split('\n')
	return response[0].split(' ')[1]
}

const getLocation = (response) => {
	response = response.split('\n')
	return response[1].split(' ')[1].trim()
}

const displayTest = (response) => {
	console.log(`${options.url}\n${'-'.repeat(options.url.length)}`)
	console.log(response)
}

const options = {
	url: `http://localhost:${port}`,
	include: true,
	redirects: 0
}
curl.request(options, (error, response) => {
	displayTest(response)
	assert.equal(
		getStatusCode(response),
		200,
		'Lowercase host request failed.'
	)

	options.url = `http://LOCALHOST:${port}`
	curl.request(options, (error, response) => {
		displayTest(response)
		assert.equal(
			getStatusCode(response),
			301,
			'Uppercase host request is not redirected.'
		)
		assert.equal(
			getLocation(response),
			`${options.url.toLowerCase()}/`,
			'URL is not in lowercase.'
		)

		const key = randomString.generate(10)
		const value = randomString.generate()
		const resource = randomString.generate()
		options.url = `http://LOCALHOST:${port}/${resource}?${key}=${value}`
		curl.request(options, (error, response) => {
			displayTest(response)
			assert.equal(
				getStatusCode(response),
				301,
				'Uppercase request is not redirected.'
			)

			const href = getLocation(response)
			const queryStart = href.indexOf('?')
			const actualUrl = href.slice(0, queryStart)
			const actualQuery = href.slice(queryStart)
			const expectedUrl = options.url.slice(0, queryStart).toLowerCase()
			const expectedQuery = options.url.slice(queryStart)

			assert.equal(
				actualUrl,
				expectedUrl,
				'URL is not in lowercase.'
			)

			assert.equal(
				actualQuery,
				expectedQuery,
				'Query is different.'
			)

			console.log(`Everything went ok!`)
			process.exit()
		})
	})

})
