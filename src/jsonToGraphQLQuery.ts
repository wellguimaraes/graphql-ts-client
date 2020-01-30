export function jsonToGraphQLQuery({
  kind,
  name,
  jsonQuery,
  typesTree,
}: {
  kind: 'query' | 'mutation'
  name: string
  jsonQuery: any
  typesTree: any
}) {
  const variablesData = {} as any

  extractVariables({
    jsonQuery: { [name]: jsonQuery },
    variables: variablesData,
    parentType: kind === 'query' ? typesTree.Query : typesTree.Mutation,
  })

  const query = `${kind} ${name}(${Object.entries(variablesData)
    .map(([name, { type }]: any) => `$${name}: ${type}`)
    .join(', ')}) { ${name}${toGraphql(jsonQuery)} }`

  const variables = Object.fromEntries(Object.entries(variablesData).map(([k, v]: any) => [k, v.value]))

  return {
    query,
    variables,
  }
}

function extractVariables({ jsonQuery, variables, parentType }: { jsonQuery: any; variables: any; parentType: any }) {
  if (jsonQuery.__args) {
    Object.keys(jsonQuery.__args).forEach(k => {
      const variableName = `${k}_${Math.random()
        .toString(36)
        .substr(2, 4)}`

      if (typeof jsonQuery.__args[k] === 'string' && jsonQuery.__args[k].startsWith('$')) return

      variables[variableName] = {
        type: parentType.__args[k],
        value: jsonQuery.__args[k],
      }
      jsonQuery.__args[k] = `$${variableName}`
    })
  }

  Object.keys(jsonQuery)
    .filter(k => k !== '__args' && typeof jsonQuery[k] === 'object')
    .forEach(k =>
      extractVariables({
        jsonQuery: jsonQuery[k],
        variables,
        parentType: parentType[k],
      })
    )
}

function toGraphql(jsonQuery: any) {
  const fields = Object.entries(jsonQuery)
    .filter(([k, v]) => k !== '__args' && v !== false && v !== undefined)
    .map(([k, v]) => (typeof v === 'object' ? `${k}${toGraphql(v)}` : k))
    .join(' ') as any

  const args = jsonQuery.__args
    ? `(${Object.entries(jsonQuery.__args)
        .map(([k, v]) => `${k}:${v}`)
        .join(',')})`
    : ''

  return `${args} ${fields ? `{ ${fields} }` : ''}`
}
