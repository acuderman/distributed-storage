pragma solidity >=0.4.21 <0.9.0;

contract Files {
  struct File {
    string file_name;
    string ipfs_cid;
  }

  mapping(address => File[]) public files;

  function addFile(string memory _file_name, string memory _ipfs_cid) public {
      File memory newFile = File(
        _file_name,
        _ipfs_cid
      );

      files[msg.sender].push(newFile);
    }

    function getFilesLength(address fileOwner) public view returns(uint count) {
        return files[fileOwner].length;
    }
}