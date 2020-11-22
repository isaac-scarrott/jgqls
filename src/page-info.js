/* eslint-disable @typescript-eslint/no-var-requires */
const scalars = require('./scalars')

const basePageInfo = {
  startCursor: scalars.String,
  endCursor: scalars.String,
  hasNextPage: scalars.Boolean['!'],
  hasPreviousPage: scalars.Boolean['!'],
}

module.exports = basePageInfo
