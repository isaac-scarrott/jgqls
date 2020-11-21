const { valueKey } = require('./keys')

const baseScalarType = (graphqlScalarType) => {
  const value = graphqlScalarType

  return {
    '!': { [valueKey]: `${value}!` },
    [valueKey]: value,
  }
}

const scalars = {
  ID: baseScalarType('ID'),
  String: baseScalarType('String'),
  Int: baseScalarType('Int'),
  Float: baseScalarType('Float'),
  Boolean: baseScalarType('Boolean'),
  Date: baseScalarType('Date'),
  JSON: baseScalarType('JSON'),
}

module.exports = scalars
