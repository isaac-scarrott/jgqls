/* eslint-disable @typescript-eslint/no-var-requires */
const scalars = require('./scalars')

const basePageInfo = {
  startCursor: scalars.String,
  endCursor: scalars.String,
  hasNextPage: scalars.Boolean.required,
  hasPreviousPage: scalars.Boolean.required,
}

module.exports = { PageInfo: basePageInfo }
