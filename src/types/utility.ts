import { scalars } from './scalar'

const basePageInfo = {
  startCursor: scalars.String,
  endCursor: scalars.String,
  hasNextPage: scalars.Boolean.required,
  hasPreviousPage: scalars.Boolean.required,
}

const PageInfo = {
  ...basePageInfo,
  pick: (...values: Array<keyof typeof basePageInfo>) =>
    values.reduce((acc: any, value: keyof typeof basePageInfo) => {
      acc[value] = basePageInfo[value]

      return acc
    }, {} as any),
}

const Node = {
  id: scalars.ID.required,
}

export { PageInfo, Node }
