import * as prompt from './io_facade/prompt'
import * as logger from './io_facade/logger'
import * as ipfs from './ipfs'
import * as eth from './eth'

export interface UploadOptions {
  ethUrl: string
  ipfsUrl: string
}
export interface ListOptions {
  ethUrl: string
}

interface FileDisplay {
  name: string
  url: string
}

const ETHEREUM_PRIVATE_KEY_PROMPT: string = 'Ethereum account private key: '

export async function uploadFile(
  filePath: string,
  uploadOptions: UploadOptions
): Promise<void> {
  const privateKey: string = await prompt.readPassword(
    ETHEREUM_PRIVATE_KEY_PROMPT
  )

  const cid: string = await ipfs.uploadFile(filePath, uploadOptions.ipfsUrl)
  await eth.storeCid(cid, filePath, privateKey, uploadOptions.ethUrl)

  const ipfsFileUrl: string = ipfs.constructFileUrl(cid)
  logger.log(`File url: ${ipfsFileUrl}`)
}

export async function listFiles(listOptions: ListOptions): Promise<void> {
  const privateKey: string = await prompt.readPassword(
    ETHEREUM_PRIVATE_KEY_PROMPT
  )

  const files: eth.File[] = await eth.getFiles(privateKey, listOptions.ethUrl)

  const displayFiles: FileDisplay[] = files.map((file: eth.File) => ({
    name: file.file_name,
    url: ipfs.constructFileUrl(file.ipfs_cid),
  }))

  logger.table(displayFiles)
}
