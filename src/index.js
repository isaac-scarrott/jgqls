/* eslint-disable @typescript-eslint/no-var-requires */
const scalars = require('./scalars')
const types = require('./types')
const parse = require('./parser')

const jgqls = {
  ...scalars,
  ...types,
}

module.exports = jgqls
module.exports.jgqlsParse = parse
