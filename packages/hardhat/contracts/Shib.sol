// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Shib is ERC20 {
  constructor() ERC20('SHIB', 'LShiba Inu') {
    _mint(msg.sender, 5000000000 * 10**18);
  }
}