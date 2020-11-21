JSON JGQLS schema to GraphQL schema string.

Create a JOI-like json schema using the object available to create inputs and types that can be reusable. Supports extend, required and arrays.

Example Input:

```javascript
import jgqls, { jgqlsParse } from ('jgqls')

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

const UserType = jgqls.type({ UserType: user })
const UserInput = jgqls.input({ UserInput: user })

jgqlsParse([UserType, UserInput])
```

Example Output

```graphql
type PreferencesType {
  company: String
  telephone: String
}

type UserType {
  uid: ID!
  username: String
  role: String
  last_activity: Date
  date_created: Date
  password: String
  preferences: [PreferencesType]
  plan: String
}

input PreferencesInput {
  company: String
  telephone: String
}

input UserInput {
  uid: ID!
  username: String
  role: String
  last_activity: Date
  date_created: Date
  password: String
  preferences: [PreferencesInput]
  plan: String
}
```
