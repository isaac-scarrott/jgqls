const { metaDataKey, valueKey } = require('./keys')
const { reduceObject, isJsonObject, isBaseScalarType, convertToCapitalCase, deepCopyJson } = require('./utils')

const noramliseJson = (jgqlsInputJson) => {
  return reduceObject(
    jgqlsInputJson,
    (acc, currentJson, key) => {
      if (isBaseScalarType(currentJson)) {
        acc[key] = currentJson[valueKey]
      } else if (Array.isArray(currentJson) && isBaseScalarType(currentJson[0])) {
        acc[key] = `[${currentJson[0][valueKey]}]`
      } else if (isJsonObject(currentJson)) {
        acc[key] = noramliseJson(currentJson)
      } else if (Array.isArray(currentJson) && isJsonObject(currentJson[0])) {
        currentJson = currentJson[0]
        currentJson[metaDataKey] = { isArray: true }
        acc[key] = noramliseJson(currentJson)
      } else {
        acc[key] = currentJson
      }

      return acc
    },
    {},
  )
}

const extractNestedObjects = (jgqlsInputJson) => {
  let extracted = []

  const type = convertToCapitalCase(jgqlsInputJson[metaDataKey].type)

  Object.keys(jgqlsInputJson).forEach((key) => {
    if (isJsonObject(jgqlsInputJson[key]) && key !== metaDataKey) {
      const typeName = convertToCapitalCase(key) + type
      const newObj = deepCopyJson(jgqlsInputJson[key])

      newObj[metaDataKey] = { ...jgqlsInputJson[metaDataKey], name: typeName }

      const extractedData = extractNestedObjects(newObj)

      if (Array.isArray(extractedData)) {
        extracted.push(...extractedData)
      } else {
        extracted.push(extractedData)
      }

      if (jgqlsInputJson[key][metaDataKey] && jgqlsInputJson[key][metaDataKey].isArray) {
        jgqlsInputJson[key] = `[${typeName}]`
      } else {
        jgqlsInputJson[key] = typeName
      }
    }
  })

  return extracted.concat(jgqlsInputJson)
}

const convertJsonToGraphqlSchemaString = (jgqlsInputJson) => {
  return jgqlsInputJson.reduce((acc, schema) => {
    const { type, name, isExtend = false } = schema[metaDataKey]

    delete schema[metaDataKey]
    const formattedData = JSON.stringify(schema, null, 2).replace(/(\\"|"|,)/g, '')

    const data = `${isExtend ? 'extend ' : ''}${type} ${name} ${formattedData}`
    return `${acc}\n\n${data}`
  }, '')
}

const parse = (jgqlsInputJson) => {
  const parsedData = jgqlsInputJson.map((input) => {
    const clonedInput = deepCopyJson(input)
    const normalisedInputType = noramliseJson(clonedInput)
    console.log(JSON.stringify(normalisedInputType, null, 2))

    return extractNestedObjects(normalisedInputType)
  })

  return convertJsonToGraphqlSchemaString(parsedData.flat())
}

module.exports = parse
