var Uumm = artifacts.require("./Uumm.sol")
var Web3 = new (require("web3"))
var Validators = require("./Validators.js")
var Proposals = require("./VotingData.js").proposals
var Contributors = require("./VotingData.js").contributors


const initialSateResults = {
    projectsLength : 0,
    projectId:0,
    proposalsLength:0,
    pendingProposalsLength:0,
    proposalDetails:
    {
        proposalId:"",
        author:"",
        title:0,
        reference:0,
        valueAmount:0,
        creationDate:0
    }
}

const nonexistentArguments = {
    ProjectId:"32bytesString",
    ProposalId:123,
    PendingProposalIndex:123
}

const errors = 
{
    InvalidOpcodeInCall:        "VM Exception while executing eth_call: invalid opcode",
    InvalidOpcodeInTransaction: "VM Exception while processing transaction: invalid opcode"
}

const firstProject =
{
    name:"Project name with 32 characters.",
    projectsLength:1,
}

const addressBook=
{
    PROJECT_CREATOR:0,
    CONTRIBUTOR1: 1,
    CONTRIBUTOR2: 2,
    CONTRIBUTOR3: 3,
    RANDOM_USER:9 //Never writes (only calls, no transfers)
}


contract('Uumm', async function(accounts)
{

    getAddress=(index)=>
    {
        return accounts[index]
    }

    getAddress(addressBook.PROJECT_CREATOR)

    let uummInstance = await  Uumm.deployed()


    it("...check initial state data", async function()
    {
        //ProjectLength
        let projectsLength = await uummInstance.GetProjectsLength.call(getAddress(addressBook.RANDOM_USER), {from: getAddress(addressBook.RANDOM_USER)})
        assert.equal (projectsLength.toNumber(), initialSateResults.projectsLength, "No project should exist yet")

        // project Id
        uummInstance.GetProjectIdByIndex.call(getAddress(addressBook.RANDOM_USER), 0, {from: getAddress(addressBook.RANDOM_USER)})
        .then(assert.fail)
         .catch(function(error) {
            assert(
                error.message.indexOf(errors.InvalidOpcodeInCall) !== -1,
                'No project should exist yet: It should throw: ' + errors.InvalidOpcodeInCall
            )
         })

        //ProposalLength
        let proposalsLength = await uummInstance.GetProposalsLength.call(nonexistentArguments.ProjectId, {from: getAddress(addressBook.RANDOM_USER)})
        assert.equal (proposalsLength.toNumber(), initialSateResults.proposalsLength, "No proposal should exist yet") 

        //PendingProposalLength
        let pendingProposalsLength = await uummInstance.GetPendingProposalsLength.call(nonexistentArguments.ProjectId, {from: getAddress(addressBook.RANDOM_USER)})
        assert.equal (pendingProposalsLength.toNumber(), initialSateResults.pendingProposalsLength, "No pending proposal should exist yet")

        //ProposalDetails
        uummInstance.GetProposalDetails.call(nonexistentArguments.ProjectId, nonexistentArguments.ProposalId, {from: getAddress(addressBook.RANDOM_USER)})
        .then(assert.fail)
        .catch(function(error) {
            assert(
                error.message.indexOf(errors.InvalidOpcodeInCall) !== -1,
                'No proposal exists yet: It should throw: ' + errors.InvalidOpcodeInCall
            )
         })

        //ProposalState
        uummInstance.GetProposalState.call(nonexistentArguments.ProjectId, nonexistentArguments.ProposalId, {from: getAddress(addressBook.RANDOM_USER)})
        .then(assert.fail)
        .catch(function(error) {
            assert(
                error.message.indexOf(errors.InvalidOpcodeInCall) !== -1,
                'No proposal exists yet: It should throw: ' + errors.InvalidOpcodeInCall
            )
         })

        //Pending proposal Id
        uummInstance.GetPendingProposalId.call(nonexistentArguments.ProjectId, nonexistentArguments.PendingProposalIndex, {from: getAddress(addressBook.RANDOM_USER)})
        .then(assert.fail)
        .catch(function(error) {
            assert(
                error.message.indexOf(errors.InvalidOpcodeInCall) !== -1,
                'No proposal exists yet: It should throw: ' + errors.InvalidOpcodeInCall
            )
         })
    })

    //TODO: We should be able to get the generated projectId on the frontend
    let project1Id 
    it("...should create a new project", async function() {
        let transaction = await uummInstance.CreateProject(firstProject.name, {from: getAddress(addressBook.PROJECT_CREATOR)})
        Validators.validateGasUsed ("CreateProject", transaction.receipt.gasUsed, 390000)
        let numberOfProjects = await uummInstance.GetProjectsLength.call(getAddress(addressBook.PROJECT_CREATOR) , {from: getAddress(addressBook.RANDOM_USER)})
        assert.equal(numberOfProjects.toNumber(), firstProject.projectsLength, "One single project should exist")
    }) 

    it("...get the project id", async function() {
        project1Id = await uummInstance.GetProjectId(getAddress(addressBook.PROJECT_CREATOR), 0, {from: getAddress(addressBook.RANDOM_USER)})
        //TODO: Check the hash
        assert.isOk(project1Id,"should be a sha3 of the project creator address + a nonce")
    })

    it("...only 1 token should exist", async function() {
        let totalSupply = await uummInstance.GetTotalSupply.call(project1Id, {from: getAddress(addressBook.RANDOM_USER)})
        assert.equal(totalSupply.toNumber(), 1, "One single token should exist")
    }) 

    ////ProposalState #0
    it("...project creator creates a new proposal", async function() {

        Proposals[0].creationTimestamp = Date.now()/1000
        Proposals[0].author = getAddress(addressBook.PROJECT_CREATOR)

        let transaction = await uummInstance.CreateProposal(project1Id, Proposals[0].title, Proposals[0].reference, Proposals[0].valueAmount,  {from: getAddress(addressBook.PROJECT_CREATOR)})
        Validators.validateGasUsed ("CreateProposal", transaction.receipt.gasUsed, 250000)

        await Validators.validateProposalDetails(uummInstance, getAddress(addressBook.PROJECT_CREATOR), project1Id, Proposals[0])
        await Validators.validateProposalState(uummInstance, getAddress(addressBook.PROJECT_CREATOR), project1Id, Proposals[0], 0)
    })

    it("...one proposal should exist", async function() {
        let proposalsLength = await uummInstance.GetProposalsLength.call(project1Id, {from: getAddress(addressBook.RANDOM_USER)})
        assert.equal(proposalsLength.toNumber(), 1 ,"one proposal should be created")
    })

    //ProposalState #1
    it("...vote in favor of existing proposal", async function() {
        let transaction = await uummInstance.VoteProposal(project1Id, Proposals[0].id, true, {from: getAddress(addressBook.PROJECT_CREATOR)})
        Validators.validateGasUsed ("VoteProposal", transaction.receipt.gasUsed, 70000)
        await Validators.validateProposalState(uummInstance, getAddress(addressBook.PROJECT_CREATOR), project1Id, Proposals[0], 1)
        await Validators.validateContributorVote(uummInstance, getAddress(addressBook.PROJECT_CREATOR), project1Id, Proposals[0], 1, addressBook.PROJECT_CREATOR)
    })
    //ProposalState #2 (idem)
    it("...voting again should not make a difference ", async function() {      
        let transaction = await uummInstance.VoteProposal(project1Id, Proposals[0].id, true, {from: getAddress(addressBook.PROJECT_CREATOR)})
        Validators.validateGasUsed ("VoteProposal", transaction.receipt.gasUsed, 70000)
        await Validators.validateProposalState(uummInstance, getAddress(addressBook.PROJECT_CREATOR), project1Id, Proposals[0], 2)
        await Validators.validateContributorVote(uummInstance, getAddress(addressBook.PROJECT_CREATOR), project1Id, Proposals[0], 2, addressBook.PROJECT_CREATOR)
    })
    //ProposalState #3
    it("...voting again, against it, should change the vote", async function() {      
        let transaction = await uummInstance.VoteProposal(project1Id, Proposals[0].id, false, {from: getAddress(addressBook.PROJECT_CREATOR)})
        Validators.validateGasUsed ("VoteProposal", transaction.receipt.gasUsed, 70000)
        await Validators.validateProposalState(uummInstance, getAddress(addressBook.PROJECT_CREATOR), project1Id, Proposals[0], 3)
        await Validators.validateContributorVote(uummInstance, getAddress(addressBook.PROJECT_CREATOR), project1Id, Proposals[0], 3, addressBook.PROJECT_CREATOR)
    })
    //ProposalState #4
    it("...voting again, in favor, should change the vote back", async function() {      
        let transaction = await uummInstance.VoteProposal(project1Id, Proposals[0].id, true, {from: getAddress(addressBook.PROJECT_CREATOR)})
        Validators.validateGasUsed ("VoteProposal", transaction.receipt.gasUsed, 70000)
        await Validators.validateProposalState(uummInstance, getAddress(addressBook.PROJECT_CREATOR), project1Id, Proposals[0], 4)
        await Validators.validateContributorVote(uummInstance, getAddress(addressBook.PROJECT_CREATOR), project1Id, Proposals[0], 4, addressBook.PROJECT_CREATOR)
    })
    //ProposalState #5
    it("...Resolving proposal", async function() {      
        let transaction = await uummInstance.ResolveProposal(project1Id, Proposals[0].id, {from: getAddress(addressBook.RANDOM_USER)})
        Validators.validateGasUsed ("ResolveProposal", transaction.receipt.gasUsed, 104000)
        await Validators.validateProposalState(uummInstance, getAddress(addressBook.PROJECT_CREATOR), project1Id, Proposals[0], 5)
    })

    it("...10 token should exist", async function() {
        let totalSupply = await uummInstance.GetTotalSupply.call(project1Id, {from: getAddress(addressBook.RANDOM_USER)})
        assert.equal(totalSupply.toNumber(), 10, "10 token should exist")
    }) 

    //New proposal from contributor 1
    ////ProposalState #0
    it("...external user creates a new proposal", async function() {

        Proposals[1].creationTimestamp = Date.now()/1000
        Proposals[1].author = getAddress(addressBook.CONTRIBUTOR1)

        let transaction = await uummInstance.CreateProposal(project1Id, Proposals[1].title, Proposals[1].reference, Proposals[1].valueAmount,  {from: getAddress(addressBook.CONTRIBUTOR1)})
        Validators.validateGasUsed ("CreateProposal", transaction.receipt.gasUsed, 390000)

        await Validators.validateProposalDetails(uummInstance, getAddress(addressBook.RANDOM_USER), project1Id, Proposals[1])
        await Validators.validateProposalState(uummInstance, getAddress(addressBook.RANDOM_USER), project1Id, Proposals[1], 0)
    })

    it("...token supply should be 10", async function() {
        let totalSupply = await uummInstance.GetTotalSupply.call(project1Id, {from: getAddress(addressBook.RANDOM_USER)})
        assert.equal(totalSupply.toNumber(), 10, "10 token should exist")
    }) 

    it("...two proposals should exist", async function() {
        let proposalsLength = await uummInstance.GetProposalsLength.call(project1Id, {from: getAddress(addressBook.RANDOM_USER)})
        assert.equal(proposalsLength.toNumber(), 2 ,"two proposals should be created")
    })

    //Proposal2 State #1
    it("...project creator vote in favor of existing proposal", async function() {
        let transaction = await uummInstance.VoteProposal(project1Id, Proposals[1].id, true, {from: getAddress(addressBook.PROJECT_CREATOR)})
        Validators.validateGasUsed ("VoteProposal", transaction.receipt.gasUsed, 70000)
        await Validators.validateProposalState(uummInstance, getAddress(addressBook.PROJECT_CREATOR), project1Id, Proposals[1], 1)
        await Validators.validateContributorVote(uummInstance, getAddress(addressBook.PROJECT_CREATOR), project1Id, Proposals[1], 1, addressBook.PROJECT_CREATOR)
    })

    //Proposal2 State #1
    it("...proposal creator votes in favor of existing proposal and fails", async function() {
        uummInstance.VoteProposal(project1Id, Proposals[1].id, true, {from: getAddress(addressBook.CONTRIBUTOR1)})
        .then(assert.fail)
        .catch(function(error) {
            assert(
                error.message.indexOf(errors.InvalidOpcodeInTransaction) !== -1,
                'Only exsisting contributors should be able to vote '+errors.InvalidOpcodeInTransaction
            )
         })
    })

    it("...Resolving proposal", async function() {      
        let transaction = await uummInstance.ResolveProposal(project1Id, Proposals[1].id, {from: getAddress(addressBook.RANDOM_USER)})
        Validators.validateGasUsed ("ResolveProposal", transaction.receipt.gasUsed, 104000)
        await Validators.validateProposalState(uummInstance, getAddress(addressBook.PROJECT_CREATOR), project1Id, Proposals[1], 2)
    })

    it("...totalSupply should be 40", async function() {
        let totalSupply = await uummInstance.GetTotalSupply.call(project1Id, {from: getAddress(addressBook.RANDOM_USER)})
        assert.equal(totalSupply.toNumber(), 40, "Total supply should be 40")
    }) 

    //FUNDING

    it("...should fund with 100 eth the project and update the eth balances of the contributors", async function(){
        let etherAmount = 1
        let weiAmount = web3.toWei(etherAmount, "ether")

        let transaction = await uummInstance.FundProject(project1Id, {from: getAddress(addressBook.RANDOM_USER), value: weiAmount})
        let contributorsLength = await uummInstance.GetContributorsLength.call(project1Id, {from: getAddress(addressBook.RANDOM_USER)})
        //assert.equal(contributorsLength.toNumber(), 2, "Two contributors exist")
        for(let i = 0; i<contributorsLength.toNumber(); i++)
        {
            await Validators.validateContributorData(uummInstance, getAddress(addressBook.RANDOM_USER),  project1Id, Contributors[i])
        }
    })

})