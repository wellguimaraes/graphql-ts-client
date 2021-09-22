import { jsonToGraphQLQuery } from './jsonToGraphQLQuery'

describe('jsonToGraphQLQuery', () => {
  it('use args without mutating', () => {
    const jsonQuery = {
      __args: {
        foo: 'Bar',
      },

      something: true,
    }

    const originalArgs = JSON.stringify(jsonQuery)

    const response = jsonToGraphQLQuery({
      kind: 'query',
      name: 'testing',
      jsonQuery,
      typesTree: {
        Query: {
          get testing(): any {
            return {
              __args: {
                foo: 'UUID!',
              },
            }
          },
        },
      },
    })

    expect(response).not.toBeNull()
    expect(originalArgs).toBe(JSON.stringify(jsonQuery))
  })

  it('variables are correctly named', () => {
    const jsonQuery = {
      __args: {
        foo: 'Bar',
      },

      something: true,
    }

    const response = jsonToGraphQLQuery({
      kind: 'query',
      name: 'testing',
      jsonQuery,
      typesTree: {
        Query: {
          get testing(): any {
            return {
              __args: {
                foo: 'UUID!',
              },
            }
          },
        },
      },
    })

    Object.keys(response.variables).forEach(varName => {
      expect(response.query.split(varName).length - 1).toBeGreaterThanOrEqual(2) //every variable name should be present at least 2 times
    })
  })
})
