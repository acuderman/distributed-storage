import { describe, it, jest, expect, beforeEach } from '@jest/globals'
import { when } from 'jest-when'

import * as prompt from './io_facade/prompt'
import * as logger from './io_facade/logger'
import * as ipfs from './ipfs'
import * as eth from './eth'
import * as handlers from './command_handler'
import { type File } from './eth'

jest
  .mock('./io_facade/prompt', () => ({
    readPassword: jest.fn(),
  }))
  .mock('./io_facade/logger', () => ({
    log: jest.fn(),
    table: jest.fn(),
  }))
  .mock('./ipfs', () => ({
    uploadFile: jest.fn(),
    constructFileUrl: jest.fn(),
  }))
  .mock('./eth', () => ({
    storeCid: jest.fn(),
    getFiles: jest.fn(),
  }))

describe('command_handler', () => {
  const privateKey: string = 'privateKey'

  beforeEach(() => {
    when(prompt.readPassword)
      .calledWith('Ethereum account private key: ')
      .mockResolvedValue(privateKey)
  })

  describe('uploadFile', () => {
    const filePath: string = 'filePath'
    const uploadOptions: handlers.UploadOptions = {
      ethUrl: 'ethUrl',
      ipfsUrl: 'ipfsUrl',
    }
    const cid: string = 'cid'

    it('should upload file to IPFS and store reference in smart contract', async () => {
      const ipfsFileUrl: string = 'ipfsFileUrl'
      when(ipfs.uploadFile)
        .calledWith(filePath, uploadOptions.ipfsUrl)
        .mockResolvedValue(cid)
      when(ipfs.constructFileUrl).calledWith(cid).mockReturnValue(ipfsFileUrl)

      await handlers.uploadFile(filePath, uploadOptions)

      expect(eth.storeCid).toHaveBeenCalledWith(
        cid,
        filePath,
        privateKey,
        uploadOptions.ethUrl
      )
      expect(logger.log).toHaveBeenCalledWith(`File url: ${ipfsFileUrl}`)
    })
  })

  describe('listFiles', () => {
    const listOptions: handlers.ListOptions = {
      ethUrl: 'ethUrl',
    }

    it('should list already uploaded files', async () => {
      const ipfsFileUrl: string = 'ipfsFileUrl'
      const file: File = { file_name: 'file.js', ipfs_cid: 'cid' }
      when(eth.getFiles)
        .calledWith(privateKey, listOptions.ethUrl)
        .mockResolvedValue([file])
      when(ipfs.constructFileUrl)
        .calledWith(file.ipfs_cid)
        .mockReturnValue(ipfsFileUrl)

      await handlers.listFiles(listOptions)

      expect(logger.table).toHaveBeenCalledWith([
        {
          name: file.file_name,
          url: ipfsFileUrl,
        },
      ])
    })
  })
})
