import { valueKey } from '../random-keys'

const baseScalarType = (graphqlType: string) => {
  const value = graphqlType

  return {
    '!': `${value}!`,
    required: `${value}!`,
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

export { scalars, baseScalarType }
