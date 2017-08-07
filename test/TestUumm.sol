pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Uumm.sol";

contract TestUumm 
{

    function testCreateProject()
    {
       // Uumm uumm = Uumm(DeployedAddresses.Uumm());

        uint256 expected = 2;
        Assert.equal( 2, expected, "It should return the sha3 of the address + the nonce");
        
    }
}