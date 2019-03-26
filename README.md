Koa middleware that redirects all requests to an URL with
uppercase letters to the same URL in lowercase, ignoring the query
string (key and value).

# Installation

    npm install koa-lowercase-url

# Usage

```javascript
const app = new (require('koa'));
app.use(require('koa-to-lowercase')());
app.use(async (ctx, next) => {
   ctx.response.body = 'If this URL had uppercase letters before the ? now they are in lowercase.';
});
app.listen(8000);
```

# License

[CC0](https://creativecommons.org/publicdomain/zero/1.0/)

# Related middleware

[koa-no-trailing-slash](https://www.npmjs.com/package/koa-no-trailing-slash)
