import { describe, expect, it, jest } from '@jest/globals'
import { when } from 'jest-when'

import * as ipfs from './ipfs'
import * as fs from 'fs/promises'
import { type IPFS, createIpfsClient } from './client_facade/ipfs_client'

jest
  .mock('./client_facade/ipfs_client', () => ({
    createIpfsClient: jest.fn(),
  }))
  .mock('fs/promises', () => ({
    readFile: jest.fn(),
  }))

const mockIpfsClient: IPFS = {
  add: jest.fn(),
} as unknown as IPFS

describe('Ipfs', () => {
  describe('uploadFile', () => {
    const filePath: string = 'filePath'
    const ipfsUrl: string = 'ipfsUrl'
    const fileContent: Buffer = Buffer.from('fileContent')

    it('should upload file and return cid', async () => {
      const expectedCid: string = 'expectedCid'
      when(fs.readFile).calledWith(filePath).mockResolvedValue(fileContent)
      when(createIpfsClient)
        .calledWith(ipfsUrl)
        .mockResolvedValue(mockIpfsClient)
      when(mockIpfsClient.add)
        .calledWith(fileContent)
        .mockResolvedValue({ cid: expectedCid })

      const cid: string = await ipfs.uploadFile(filePath, ipfsUrl)

      expect(cid).toBe(expectedCid)
    })
  })

  describe('constructFileUrl', () => {
    it('should construct ipfs file url', () => {
      const cid: string = 'cid'

      const url: string = ipfs.constructFileUrl(cid)

      expect(url).toBe(`https://ipfs.io/ipfs/${cid}`)
    })
  })
})
