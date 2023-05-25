import Web3 from 'web3'
import { type AbiItem } from 'web3-utils'
import { type Contract } from 'web3-eth-contract'
import { type Account } from 'web3-core'

export function createWeb3Client(ethNodeUrl: string): Web3 {
  const web3: Web3 = new Web3(ethNodeUrl)

  return web3
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
