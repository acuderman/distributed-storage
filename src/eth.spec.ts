import { describe, it, jest, expect, beforeEach } from '@jest/globals'
import { when } from 'jest-when'

import * as eth from './eth'
import {
  createWeb3Client,
  ethAccountFromPrivateKey,
  setupEthContract,
} from './client_facade/web3_client'
import type Web3 from 'web3'
import { type Account } from 'web3-core'
import filesContractJson from 'contract/Files.json'
import { type Contract } from 'web3-eth-contract'
import { type File } from './eth'

jest.mock('./client_facade/web3_client').mock('contract/Files.json', () => ({
  abi: [{ name: 'addFile', type: 'function' }],
  networks: {
    network1: {
      address: 'address',
    },
  },
}))

const GAS_LIMIT: number = 6721975
const mockWeb3Client: Web3 = {
  eth: {
    accounts: {
      privateKeyToAccount: jest.fn(),
    },
    Contract: jest.fn(),
  },
} as unknown as Web3

const mockWeb3Account: Account = {
  address: 'address',
} as unknown as Account

const mockContract: Contract = {
  options: {},
  methods: {
    addFile: jest.fn(),
    getFilesLength: jest.fn(),
    files: jest.fn(),
  },
} as unknown as Contract

describe('eth', () => {
  const ethPrivateKey: string = 'ethPrivateKey'
  const ethNodeUrl: string = 'ethNodeUrl'

  beforeEach(() => {
    when(createWeb3Client)
      .calledWith(ethNodeUrl)
      .mockReturnValue(mockWeb3Client)
    when(ethAccountFromPrivateKey)
      .calledWith(mockWeb3Client, ethPrivateKey)
      .mockReturnValue(mockWeb3Account)
    when(setupEthContract)
      .calledWith(mockWeb3Client, filesContractJson.abi)
      .mockReturnValue(mockContract)
  })

  describe('storeCid', () => {
    const fileName: string = 'file.js'
    const cid: string = 'cid'
    const filePath: string = `./path/to/${fileName}`

    it('should store cid in the smart contract', async () => {
      const mockSend = jest.fn()

      when(mockContract.methods.addFile)
        .calledWith(fileName, cid)
        .mockReturnValue({ send: mockSend })

      await eth.storeCid(cid, filePath, ethPrivateKey, ethNodeUrl)

      expect(mockSend).toHaveBeenCalledWith({ gas: GAS_LIMIT })
    })
  })

  describe('getFiles', () => {
    it('should get uploaded files from the smart contract', async () => {
      const fileLength: number = 2
      const file: File = { file_name: 'file.js', ipfs_cid: 'cid' }
      const mockFilesLengthCall = jest.fn().mockReturnValue(fileLength)
      const mockFileCall = jest.fn().mockReturnValue(file)
      when(mockContract.methods.getFilesLength)
        .calledWith(mockWeb3Account.address)
        .mockReturnValue({ call: mockFilesLengthCall })
      when(mockContract.methods.files)
        .calledWith(mockWeb3Account.address, 0)
        .mockReturnValue(mockFileCall)
      when(mockContract.methods.files)
        .calledWith(mockWeb3Account.address, 1)
        .mockReturnValue(mockFileCall)

      const files: File[] = await eth.getFiles(ethPrivateKey, ethNodeUrl)

      expect(files).toEqual([file, file])
    })
  })
})
