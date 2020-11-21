const { valueKey } = require('./keys')

/**
 * Checks if input is a JSON object (doesn't include arrays)
 */
const isJsonObject = (input) => {
  return typeof input === 'object' && !Array.isArray(input) && input !== null
}

/**
 * Most basic deep copy for a JSON object
 */
const deepCopyJson = (input) => {
  if (!isJsonObject(input)) {
    return input
  }

  return JSON.parse(JSON.stringify(input))
}

/**
 * Checks to see if input is an internal base scalar type such as ID by checking for the existance
 * of the randomly generated value key
 */
const isBaseScalarType = (input) => {
  if (!isJsonObject(input)) {
    return false
  }

  return valueKey in input
}

/**
 * Reduce but it returns the object that it's currently iterating on and the key
 */
const reduceObject = function reduce(obj, func, initialValue) {
  return Object.keys(obj).reduce((acc, key) => {
    const copiedAcc = deepCopyJson(acc)
    const newAcc = func(copiedAcc, obj[key], key)

    return newAcc
  }, initialValue)
}

const convertToCapitalCase = (input) => {
  return input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

module.exports = { isJsonObject, isBaseScalarType, deepCopyJson, reduceObject, convertToCapitalCase }
