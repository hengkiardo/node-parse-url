
'use strict'

const Url = require('url')
const tldjs = require('tldjs')
const parseDomain = require('parse-domain')
const memoize = require('fast-memoize')

const addhttp = (url) => {
  let pattern = /^((http|https|ftp):\/\/)/

  if (!pattern.test(url)) {
    url = 'http://' + url
  }
  return url
}

const addHttpMemoize = memoize(addhttp)

const parseUrl = (url) => {
  if (typeof url !== 'string') {
    url = ''
  }

  const makeAsUrl = addHttpMemoize(url)
  const parsedUrl = Url.parse(makeAsUrl)

  if (!parsedUrl.protocol) parsedUrl.protocol = 'http'

  parsedUrl.domain = tldjs.getDomain(parsedUrl.hostname || parsedUrl.host)

  if (!parsedUrl.domain && parsedUrl.path && parsedUrl.path.includes('//')) {
    let pathParam = parsedUrl.path.split('.')
    parsedUrl.domain = `${pathParam[1]}.${pathParam[0].replace('//', '')}`
  } else {
    parsedUrl.domain = parsedUrl.hostname || parsedUrl.host
  }

  const getBaseDomain = parseDomain(parsedUrl.domain)

  if (getBaseDomain && getBaseDomain.domain) parsedUrl.host = `${getBaseDomain.domain}.${getBaseDomain.tld}`

  delete parsedUrl.auth
  delete parsedUrl.search
  // delete parsedUrl.query
  delete parsedUrl.href
  // delete parsedUrl.hash
  delete parsedUrl.slashes
  delete parsedUrl.pathname
  return parsedUrl
}

module.exports = memoize(parseUrl)
