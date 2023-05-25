#!/usr/bin/env node

import * as handlers from './command_handler'

import { Command } from 'commander'
const program = new Command()

const DEFAULT_ETH_NODE_URL = 'http://127.0.0.1:7545'
const DEFAULT_IPFS_NODE_URL = 'http://127.0.0.1:5001'

program
  .name('distributed-storage-cli')
  .description('CLI distributed storage leveraging IPFS and Ethereum chain')
  .version('1.0.0')

program
  .command('upload')
  .description('Upload a file')
  .argument('<file_path>', 'file path')
  .option('-eu, --eth-url <string>', 'Ethereum node url', DEFAULT_ETH_NODE_URL)
  .option('-iu, --ipfs-url <string>', 'IPFS node url', DEFAULT_IPFS_NODE_URL)
  .action(async (filePath: string, options: handlers.UploadOptions) => {
    await handlers.uploadFile(filePath, options)
  })

program
  .command('ls')
  .description('List uploaded files')
  .option(
    '-eu, --eth-url <string>',
    'Ethereum node http url',
    DEFAULT_ETH_NODE_URL
  )
  .action(async (options: handlers.ListOptions) => {
    await handlers.listFiles(options)
  })

program.parse()
