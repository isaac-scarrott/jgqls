/**
 * Generates a random key so that we hopefully dont get a collision with the JSON input keys
 */
const generateRandomKey = (randomNumber = Math.random()) =>
  Array(16).join(randomNumber.toString(36).slice(2, 18)).slice(0, 16)

const metaDataKey = generateRandomKey()
const valueKey = generateRandomKey()

module.exports = { metaDataKey, valueKey }
