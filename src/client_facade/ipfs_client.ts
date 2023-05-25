export interface IPFS {
  add: (content: Buffer) => Promise<{ cid: { toString: () => string } }>
}

export async function createIpfsClient(IpfsUrl: string): Promise<IPFS> {
  const { create } = await import('ipfs-http-client')

  return create(new URL(IpfsUrl)) as IPFS
}
