'use strict';

module.exports = function lowercaseUrl() {
	return async function lowercaseUrl({ request, response }, next) {
		const { origin, path, querystring } = request;

		const lowercaseable = origin + path;
		if (/[A-Z]/.test(lowercaseable)) {
			const location = lowercaseable.toLowerCase() + (querystring ? `?${querystring}` : '');

			response.status = 301;
			response.redirect(location);
			return;
		}

		await next();
	};
};
