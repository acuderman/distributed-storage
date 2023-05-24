#!/usr/bin/env node

import { Command } from 'commander'
const program = new Command()

program
  .name('distributed-storage-cli')
  .description('CLI distributed storage leveraging IPFS and Ethereum chain')
  .version('1.0.0')

program
  .command('upload')
  .description('Upload a file')
  .argument('<string>', 'file path')
  .action((_filePath: string, _options: unknown[]) => {
    // TODO: implement handler and extract file name
  })

program
  .command('download')
  .description('Download file by CID')
  .argument('<string>', 'IPFS file CID')
  .action((_filePath: string) => {
    // TODO: implement handler and check if file name and CID are mutually exclusive
  })

program
  .command('ls')
  .description('List uploaded files')
  .action(() => {
    // TODO: implement handler
  })

program.parse()
