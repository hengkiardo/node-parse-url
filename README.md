node-parse-url
==============

Take a URL string, and return an object. Extend from native url module

#url-expand

Simple and efficient URL expander.

## Installation

Global
```
npm install url-expand
```

## Usage

```js
var parseUrl = require('node-parse-url');

urlExpand('http://bit.ly/1fiiaIg', function (err, url) {
  console.log(url);
  // output
  // {
  //   protocol: 'https:',
  //   host: 'github',
  //   port: null,
  //   hostname: 'github.com',
  //   path: '/aredo',
  //   subdomain: null,
  //   tld: 'com',
  //   domain: 'github.com'
  // }
});
```

## License
(The MIT License)
