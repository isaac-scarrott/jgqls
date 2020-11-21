// eslint-disable-next-line @typescript-eslint/no-var-requires
const { convertSimplifiedJsonToSchema, jgqls } = require('../dist/index')
const userFeatures = {
  UserFeatures: {
    domains: jgqls.String,
    competitors: jgqls.String,
    unlimited: jgqls.Boolean,
    export: jgqls.Boolean,
  },
}

const userPreferences = {
  UserPreferences: {
    category: [jgqls.String],
    competitorChanges: jgqls.Int,
    competitors: [jgqls.String],
    domainChanges: jgqls.Int,
    domains: [jgqls.String],
    publishers: jgqls.JSON,
    company: jgqls.String,
    network_id: jgqls.String,
    telephone: jgqls.String,
    firstLogin: jgqls.Boolean,
    features: userFeatures,
    accountDisabled: Boolean,
  },
}

const user = {
  uid: jgqls.ID['!'],
  username: jgqls.String,
  role: jgqls.String,
  network: jgqls.String,
  last_activity: jgqls.Date,
  date_created: jgqls.Date,
  password: jgqls.String,
  preferences: userPreferences,
  plan: jgqls.String,
  pdAppLink: jgqls.String,
}

const UserType = jgqls.type({ user })

console.log(convertSimplifiedJsonToSchema([UserType]))
