import read from 'read'
import * as logger from './logger'

export async function readPassword(prompt: string): Promise<string> {
  const password: string = await read({
    prompt,
    silent: true,
  })
  logger.log('\n')

  return password
}
