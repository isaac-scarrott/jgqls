const { deepCopyJson } = require('./utils')
const { metaDataKey } = require('./keys')

const attachMetaData = (type, isExtend = false) => (inputJgqlsJson) => {
  const jgqlsJson = deepCopyJson(inputJgqlsJson)

  const name = Object.keys(jgqlsJson)[0]
  const newJgqlsJson = jgqlsJson[name]
  newJgqlsJson[metaDataKey] = { type, name, isExtend }

  return newJgqlsJson
}

const type = attachMetaData('type')
const input = attachMetaData('input')
const Mutation = attachMetaData('Mutation')
const Query = attachMetaData('Query')

const extend = {
  type: attachMetaData('type', true),
  input: attachMetaData('input', true),
  Mutation: attachMetaData('Mutation', true),
  Query: attachMetaData('Query', true),
}

const types = { type, input, Mutation, Query, extend }

module.exports = types
