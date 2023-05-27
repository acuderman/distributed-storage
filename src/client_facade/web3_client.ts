import Web3 from 'web3'
import { type AbiItem } from 'web3-utils'
import { type Contract } from 'web3-eth-contract'
import { type Account } from 'web3-core'

export function createWeb3Client(ethNodeUrl: string): Web3 {
  return new Web3(ethNodeUrl)
}

export function setupEthContract(web3: Web3, abi: AbiItem): Contract {
  return new web3.eth.Contract(abi)
}

export function getEthAccountFromPrivateKey(
  web3: Web3,
  privateKey: string
): Account {
  return web3.eth.accounts.privateKeyToAccount(privateKey)
}

export async function getGasLimit(web3: Web3): Promise<number> {
  const latestBlock = await web3.eth.getBlock('latest')

  return latestBlock.gasLimit
}
