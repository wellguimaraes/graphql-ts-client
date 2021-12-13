import { LogInfo } from './types'

export function logRequest(logInfo: LogInfo) {
  let identifier = `%c#graphql-ts-client ${logInfo.kind} ${logInfo.queryName}`
  let identifierStyles = 'color: transparent; font-size: 0px'

  console.groupCollapsed(
    `%c#graphql-ts-client %c${logInfo.kind} %c${logInfo.queryName} %c(${logInfo.duration.toFixed(2)}ms)`,
    'color: #f90',
    'color: #999',
    `color: ${logInfo.response ? 'unset' : '#f00'}; font-weight: bold`,
    'color: #999'
  )

  console.groupCollapsed(`%cQuery ${identifier}`, 'color: #999', identifierStyles)
  console.log(logInfo.formatGraphQL(logInfo.query) + identifier, identifierStyles)
  console.groupEnd()
  console.groupCollapsed(`%cVariables ${identifier}`, 'color: #999', identifierStyles)
  console.log(JSON.stringify(logInfo.variables, null, '  ') + identifier, identifierStyles)
  console.groupEnd()
  console.groupCollapsed(`%cTrace ${identifier}`, 'color: #999', identifierStyles)
  console.trace(identifier, identifierStyles)
  console.groupEnd()

  if (logInfo.response) {
    console.log('%cResponse'.padEnd(15, ' ') + identifier, 'color: #999', identifierStyles, logInfo.response)
  }
  if (logInfo.error) {
    console.log('%cError'.padEnd(15, ' ') + identifier, 'color: #999', identifierStyles, logInfo.error)
  }

  console.groupEnd()
}
