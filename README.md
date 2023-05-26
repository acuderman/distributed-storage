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

- Upload any file to IPFS and store its cid in the smart contract
- List all already uploaded files

# Environment Setup

## Pre-requisites
- Node.js installed locally (version 18 or higher).
- IPFS node running locally. Setup instructions can be found [here](https://docs.ipfs.tech/how-to/command-line-quick-start/#initialize-the-repository).
- Ganache running locally. Setup instructions can be found [here](https://trufflesuite.com/docs/ganache/quickstart/).

## Build instructions

- Clone the repository
- Deploy smart contract
    - `npm run deploy-contract`
- Build cli
  - `npm run build-cli`

# Example

![file-upload-help](/doc-images/cmd-help.png)

CLI offers two commands:
  - File upload

    ![file-upload-help](/doc-images/upload-help.png)
  - File list

    ![file-list-help](/doc-images/ls-help.png)

## File upload

- File can be uploaded using the upload command. Make sure the cli is built, and the smart contract is deployed before running the command.
Command prompt you to enter Ethereum account private key. Private key can be read from ganache UI (In the menu select Account and press on the key icon on the right).
  - `npm run cli upload <path_to_file>` (eg. `npm run cli upload ./doc-images/file-upload-example.png`)

![file-upload](/doc-images/file-upload-example.png)

## File list
- List uploaded files. Only the files uploaded by the selected account are listed.
  - `npm run cli ls`

![file-upload](/doc-images/ls-example.png)
