import chalk = require('chalk')
/**
 * @param  {{type:string} message?
 * @param  {string}} content
 * @param  {{content:string} error?
 * @param  {`Database`|`Authentication`|`Miscellaneous`} type
 * @param  {`low`|`medium`|`high`}} severity
 */
export function Logger (message? : {type:string, content:string}, error?: {content:string, type: 'Database' | 'Authentication' | 'Miscellaneous', severity : 'low' | 'medium' | 'high'}):void {
  let LogMessage:string
  if (error) {
    switch (error.type) {
      case 'Authentication': LogMessage = '[AUTHENTICATION]}'; break
      case 'Database': LogMessage = '[DATABASE]'; break
      case 'Miscellaneous': LogMessage = '[MISCELLEANEOUS]'; break
    }
    switch (error.severity) {
      case 'low' : LogMessage = chalk.grey(LogMessage); break
      case 'medium' : LogMessage = chalk.yellow(LogMessage); break
      case 'high' : LogMessage = chalk.red(LogMessage); break
    }
    return console.log(LogMessage, error.content)
  } else if (message) return console.log(`[${chalk.green(message.type.toLocaleUpperCase())}] ${message.content}`)
}
