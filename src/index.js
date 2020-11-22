/* eslint-disable @typescript-eslint/no-var-requires */
const scalars = require('./scalars')
const PageInfo = require('./page-info')
const types = require('./types')
const parse = require('./parser')

const jgqls = {
  ...scalars,
  ...types,
  PageInfo,
}

module.exports = jgqls
module.exports.jgqlsParse = parse
