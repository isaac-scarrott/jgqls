/* eslint-disable @typescript-eslint/no-var-requires */
const jgqls = require('../src/index')
const { jgqlsParse } = require('../src/index')

const userPreferences = {
  company: jgqls.String,
  telephone: jgqls.String,
}

const user = {
  uid: jgqls.ID['!'],
  username: jgqls.String,
  role: jgqls.String,
  last_activity: jgqls.Date,
  date_created: jgqls.Date,
  password: jgqls.String,
  preferences: [userPreferences],
  plan: jgqls.String,
}

const UserType = jgqls.type({ UserType: { ...user, pageInfo: jgqls.PageInfo } })
const UserInput = jgqls.input({ UserInput: { ...user } })

console.log(jgqlsParse([UserType, UserInput]))
