import { metaDataKey, valueKey } from '../random-keys'

const getAllActualValues = (obj: any) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      if (valueKey in obj[key]) {
        acc[key] = obj[key][valueKey]
      } else {
        acc[key] = getAllActualValues(obj[key])
      }

      return acc
    }

    acc[key] = obj[key]
    return acc
  }, {} as any)
}

const attachMetaDataAndGetActualValues = (type: string, isExtend = false) => (obj: any) => {
  const name = Object.keys(obj)[0]
  const newObj = obj[name]
  newObj[metaDataKey] = { type, name, isExtend }

  return getAllActualValues(newObj)
}

const type = attachMetaDataAndGetActualValues('type')
const input = attachMetaDataAndGetActualValues('input')
const Mutation = attachMetaDataAndGetActualValues('Mutation')
const Query = attachMetaDataAndGetActualValues('Query')

const extend = {
  type: attachMetaDataAndGetActualValues('type', true),
  input: attachMetaDataAndGetActualValues('input', true),
  Mutation: attachMetaDataAndGetActualValues('Mutation', true),
  Query: attachMetaDataAndGetActualValues('Query', true),
}

export { type, input, Mutation, Query, extend }
