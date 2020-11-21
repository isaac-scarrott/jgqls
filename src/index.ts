import { metaDataKey } from './random-keys'
import { scalars } from './types/scalar'
import { PageInfo } from './types/utility'
import * as types from './types/types'

const normaliseJson = (obj: any, namesofGroupedTypes: any) => {
  return Object.keys(obj).reduce((acc, key) => {
    const isArray = Array.isArray(obj[key])

    if (isArray) {
      obj[key] = normaliseJson(obj[key][0], namesofGroupedTypes)
    }

    if (typeof obj[key] === 'object') {
      if (metaDataKey in obj[key]) {
        const { name, type } = obj[key][metaDataKey]
        if (namesofGroupedTypes[type].includes(name)) {
          acc[key] = isArray ? `[${name}]` : name

          return acc
        } else {
          delete obj[key][metaDataKey]
        }
      }

      acc[key] = normaliseJson(obj[key], namesofGroupedTypes)
    } else {
      acc[key] = obj[key]
    }

    acc[key] = isArray ? `[${JSON.stringify(acc[key], null, 2)}]` : acc[key]

    return acc
  }, {} as any)
}

const convertSimplifiedJsonToSchema = (obj: any) => {
  const namesofGroupedTypes = obj.reduce((acc: any, schema: any) => {
    const { type, name } = schema[metaDataKey]

    if (!acc[type]) {
      acc[type] = []
    }

    acc[type].push(name)

    return acc
  }, {} as any)

  const normalisedJson = obj.map((i: any) => normaliseJson(i, namesofGroupedTypes))

  return normalisedJson.reduce((acc: string, schema: any) => {
    const { type, name, isExtend = false } = schema[metaDataKey]

    delete schema[metaDataKey]

    const formattedData = JSON.stringify(schema, null, 2).replace(/(\\"|"|,)/g, '')

    const data = `${isExtend ? 'extend ' : ''}${type} ${name} ${formattedData}`
    return `${acc}\n\n${data}`
  }, '')
}

const jgqls = { ...scalars, PageInfo, ...types }

export { jgqls, convertSimplifiedJsonToSchema }
