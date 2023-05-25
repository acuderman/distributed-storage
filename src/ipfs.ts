import * as fs from 'fs/promises'
import { createIpfsClient } from './client_facade/ipfs_client'

const IPFS_GATEWAY_BASE_URL: string = 'https://ipfs.io/ipfs/'

export async function uploadFile(
  filePath: string,
  IpfsUrl: string
): Promise<string> {
  const fileContent: Buffer = await fs.readFile(filePath)

  const client = await createIpfsClient(IpfsUrl)
  const { cid } = await client.add(fileContent)

  return cid.toString()
}

export function constructFileUrl(cid: string): string {
  return `${IPFS_GATEWAY_BASE_URL}${cid}`
}
