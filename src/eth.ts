import type Web3 from 'web3'
import { type Account } from 'web3-core'
import filesContractFile from 'contract/Files.json'
import { type AbiItem } from 'web3-utils'
import { type Contract } from 'web3-eth-contract'
import path from 'path'
import {
  createWeb3Client,
  getEthAccountFromPrivateKey,
  getGasLimit,
  setupEthContract,
} from './client_facade/web3_client'

const filesContractJson: FilesContract =
  filesContractFile as unknown as FilesContract

interface FilesContract {
  abi: AbiItem
  networks: Record<
    string,
    {
      address: string
    }
  >
}
export interface File {
  file_name: string
  ipfs_cid: string
}

export async function storeCid(
  cid: string,
  filePath: string,
  ethPrivateKey: string,
  ethNodeUrl: string
): Promise<void> {
  const [_, filesContract, gasLimit] = await initializeWeb3Contract(
    ethNodeUrl,
    ethPrivateKey
  )

  const fileName: string = path.basename(filePath)
  await filesContract.methods.addFile(fileName, cid).send({
    gas: gasLimit,
  })
}

export async function getFiles(
  ethPrivateKey: string,
  ethNodeUrl: string
): Promise<File[]> {
  const [web3Account, filesContract, _] = await initializeWeb3Contract(
    ethNodeUrl,
    ethPrivateKey
  )

  const filesLength: number = await filesContract.methods
    .getFilesLength(web3Account.address)
    .call()

  return await Promise.all(
    Array.from({ length: filesLength }).map(async (_, i) => {
      const file: File = await filesContract.methods
        .files(web3Account.address, i)
        .call()

      return file
    })
  )
}

async function initializeWeb3Contract(
  ethNodeUrl: string,
  ethPrivateKey: string
): Promise<[Account, Contract, number]> {
  const web3: Web3 = createWeb3Client(ethNodeUrl)
  const web3Account: Account = getEthAccountFromPrivateKey(web3, ethPrivateKey)

  const network: string = Object.keys(filesContractJson.networks)[0]

  const filesContract = setupEthContract(web3, filesContractJson.abi)
  filesContract.options.address = filesContractJson.networks[network].address
  filesContract.options.from = web3Account.address

  const gasLimit: number = await getGasLimit(web3)

  return [web3Account, filesContract, gasLimit]
}
