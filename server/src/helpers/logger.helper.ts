import chalk from 'chalk'
/**
 * @param {{type: string;}} message ?
 * @param {{content: string;}} error ?
 */
export function Logger (
  message?: { type: string; content: string },
  error?: {
    content: string
    type: 'Database' | 'Uploads' | 'Authentication' | 'Miscellaneous'
    severity: 'low' | 'medium' | 'high'
  }
): void {
  let LogMessage: string
  if (error) {
    switch (error.type) {
      case 'Authentication':
        LogMessage = '[AUTHENTICATION]}'
        break
      case 'Database':
        LogMessage = '[DATABASE]'
        break
      case 'Uploads':
        LogMessage = '[UPLOADS]'
        break
      case 'Miscellaneous':
        LogMessage = '[MISCELLANEOUS]'
        break
    }
    switch (error.severity) {
      case 'low':
        LogMessage = chalk.grey(LogMessage)
        break
      case 'medium':
        LogMessage = chalk.yellow(LogMessage)
        break
      case 'high':
        LogMessage = chalk.red(LogMessage)
        break
    }
    return console.log(LogMessage, error.content)
  } else if (message) {
    return console.log(
      `[${chalk.green(message.type.toLocaleUpperCase())}] ${message.content}`
    )
  }
}
