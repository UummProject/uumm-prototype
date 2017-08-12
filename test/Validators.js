var Numeral = require("numeral")
var Web3 = new (require("web3"))

class Validators
{

    static async validateContributorData (contract, fromAddress, projectId, expectedContributorData,)
    {
        let contributorData = await contract.GetContributorData.call(projectId, expectedContributorData.id, {from: fromAddress})
        
        let id = contributorData[0].toNumber()
        let contributorAddress = contributorData[1]
        let name = contributorData[2]
        let valueTokens = contributorData[3].toNumber()
        let etherBalance = Web3.fromWei(contributorData[4].toNumber())

        assert.equal(id, expectedContributorData.id, "Contributor id does not match")
        //assert.equal(contributorAddress, expectedContributorData.contributorAddress, "Contributor address does not match")
        assert.equal(name, expectedContributorData.name, "Contributor name does not match")
        assert.equal(valueTokens, expectedContributorData.valueTokens, "Contributor value tokens")
        assert.equal(etherBalance, expectedContributorData.etherBalance, "Contributor ethereum balance does not match")
    }

    static async validateProposalDetails (contract, fromAddress, projectId, expectedProposalData)
    {
        let proposalDetails = await contract.GetProposalDetails.call(projectId, expectedProposalData.id, {from: fromAddress})
        let id = proposalDetails[0].toNumber()
        let author = proposalDetails[1]
        let title = proposalDetails[2]
        let reference = proposalDetails[3]
        let valueAmount = proposalDetails[4].toNumber()
        let creationTimestamp = proposalDetails[5].toNumber()

        assert.equal(id, expectedProposalData.id, "Id of first proposal should be zero")
        assert.equal(author, expectedProposalData.author, "Author should be equal to the creator of the proposal")
        assert.equal(title, expectedProposalData.title, "Title doesn't match")
        assert.equal(valueAmount, expectedProposalData.valueAmount, "Value amount should match")
        assert.isAbove(creationTimestamp, expectedProposalData.creationTimestamp - 60, "Creation timestamp should more or less match current timestamp")
        assert.isBelow(creationTimestamp, expectedProposalData.creationTimestamp + 60, "Creation timestamp should more or less match current timestamp")
    }

    static async validateProposalState (contract, fromAddress, projectId, expectedProposalData, stateIndex)
    {
        let proposalState = await contract.GetProposalState.call(projectId, expectedProposalData.id, {from: fromAddress})
        
        let id = proposalState[0].toNumber()
        let state = proposalState[1].toNumber()
        let positiveVotes = proposalState[2].toNumber()
        let negativeVotes = proposalState[3].toNumber()
        let creationTimestamp = proposalState[4].toNumber()
        let totalSupply = proposalState[5].toNumber()

        assert.equal(id, expectedProposalData.id, "Id not matching")
        assert.equal(state, expectedProposalData.stateData[stateIndex].state, "State not matching")
        assert.equal(positiveVotes, expectedProposalData.stateData[stateIndex].positiveVotes, "Positive votes not matching")
        assert.equal(negativeVotes, expectedProposalData.stateData[stateIndex].negativeVotes, "Negative votes not matching")

        assert.isAbove(creationTimestamp, expectedProposalData.creationTimestamp - 60, "Creation timestamp should more or less match current timestamp")
        assert.isBelow(creationTimestamp, expectedProposalData.creationTimestamp + 60, "Creation timestamp should more or less match current timestamp")

        assert.equal(totalSupply, expectedProposalData.stateData[stateIndex].totalSupply, "TotalSupply not matching")
    }

    static async validateContributorVote(contract, fromAddress, projectId, expectedProposalData, stateIndex, voterAddressIndex)
    {
        let vote = await contract.GetContributorVote.call(projectId, expectedProposalData.id, getAddress(voterAddressIndex), {from: fromAddress})
        assert.equal(vote.toNumber(), expectedProposalData.stateData[stateIndex].contributorVotes[voterAddressIndex], "Contributor vote not matching")
    }

    static async validateGasUsed(functionName, used, expectedMax = 10000, expectedMin = 0)
    {
        this.logGas(functionName,used)
        assert.isAbove(used, expectedMin, "Not enough gas was used")
        assert.isBelow(used, expectedMax, "To much gas was used")
    }

    static logGas(functionName, usedGas)
    {
        let gasPriceInGwei = 4
        let etherToUsd = 300     
        let gweiToEther = 1/1000000000
        let usdPrice = usedGas * gasPriceInGwei * gweiToEther * etherToUsd
        let usdPriceFormatted = Numeral(usdPrice).format('$0,0.000')

        let blue = "\x1b[33m"

        console.log(blue, "      "+functionName+ " "+usedGas+" gas ("+usdPriceFormatted+")")
    }
}

const instance = new Validators()
module.exports = Validators