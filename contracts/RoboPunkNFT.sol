// SPDX-License-Identifier : UNLICENSIED

pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

// our contact is going to be inherting from ERC71, Ownable
contract RoboPunkNFT is ERC721, Ownable {
    // Storage variables
    uint256 public mintPrice; // price for minting
    uint256 public totalSupply; 
    uint256 public maxSupply; // maximum number of nfts in the collection 
    uint256 public maxPerWallet; // max number of nfts for each wallet can mint
    bool public isPublicMintEnabled; 
    string internal baseTokenUri; //url of a token for using it on openC 
    address payable public withdrawWallet;  
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721('RoboPunkNFT', 'RP') {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
    }

    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner { //only owner modifier
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), "Token doesn't exist");
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json")); 
        //this line allows openC to grab every single url of the images
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value : address(this).balance}('');
        require(success, "withdraw failed");
    }

    function mint(uint256 quantity_) public payable{
        require(isPublicMintEnabled, "minting not enabled");
        require(msg.value == quantity_ * mintPrice, "wrong min value");
        require(totalSupply + quantity_ <= maxSupply, "sold out");
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, "exceed max wallet");

        for(uint256 i=0; i<quantity_; i++){
            uint256 newTokenId = totalSupply +1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }

}
