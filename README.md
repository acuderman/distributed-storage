# Distributed Storage

Distributed storage CLI implementation leveraging IPFS and Ethereum chain

# Table of Contents

- [Features](#features)
- [Environment Setup](#environment-setup)
    - [Pre-requisites](#pre-requisites)
    - [Build instructions](#build-instructions)
- [Example](#example)
    - [File upload](#file-upload)
    - [File list](#file-list)

# Features

![file-upload-help](/doc-images/cmd-help.png)

- Upload any file to IPFS and store its cid in the smart contract
  ![file-upload-help](/doc-images/upload-help.png)

- List all already uploaded files
  ![file-list-help](/doc-images/ls-help.png)

# Environment Setup

## Pre-requisites
- Node.js installed locally (version 18 or higher).
- IPFS node running locally. Setup instructions can be found [here](https://docs.ipfs.tech/how-to/command-line-quick-start/#initialize-the-repository).
- Ganache running locally. Setup instructions can be found [here](https://trufflesuite.com/docs/ganache/quickstart/).

## Build instructions

- Clone the repository
- Install dependencies
  - `npm i`
- Deploy smart contract
  - `npm run deploy-contract`
- Build cli application
  - `npm run build-cli`

# Example

## File upload

- File can be uploaded using the upload command. Make sure the cli is built, and the smart contract is deployed before running the command.
Command will prompt for the Ethereum account private key. Private key can be read from ganache UI (In the top menu select Account and press on the key icon on the right).
  - `npm run cli upload <path_to_file>` (eg. `npm run cli upload ./doc-images/file-upload-example.png`)

![file-upload](/doc-images/file-upload-example.png)

## File list
- List uploaded files. Only the files uploaded by the selected account are listed.
  - `npm run cli ls`

![file-upload](/doc-images/ls-example.png)
