var Uumm = artifacts.require("./Uumm.sol")
var Data = require("./TestData.js")



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
    VmException:"Uncaught Error: Error: VM Exception while executing eth_call: invalid opcode",
    InvalidOpcode:"Error: VM Exception while executing eth_call: invalid opcode"
}

const firstProject =
{
    name:"First Project Name",
    projectsLength:1,
}

const firstProposal=
{
    title:"First proposal title",
    reference:"ProposalReference",
    valueAmount:10,
    id:0,
    proposalsLength:1,
    state:0
}

const expectedGasUsed=
{
    voteProposalMin: 1000,
    voteProposalMax: 100
}


/*
    #Simplest use case
    -Validate all data is correct
    -Create a new project using the 'creator' address
    -Validate the project is created and the data is correct
    -Create a new proposal using the 'creator' address
    -Validate proposal is created  and data is correct
    -Creator votes to aprove proposal
    -Validate vote is registred
    -Creator resolves proposal
    -Validate proposal is resolved
    -Create a new proposal using the 'creator' address
    -Creator votes to denny proposal
    -Validate vote is registred
    -Creator resolves proposal
    -Validate proposal is resolved
*/

contract('Uumm', async function(accounts)
{
    let projectCreator = accounts[0]
    let randomAddress = accounts[9] //Never writes (only calls, no transfers)

    let uummInstance = await  Uumm.deployed()


    it("...validate initial state data", async function()
    {
 
        //ProjectLength
        let projectsLength = await uummInstance.GetProjectsLength.call(randomAddress, {from: randomAddress})
        assert.equal (projectsLength.toNumber(), initialSateResults.projectsLength, "No project should exist yet")

        // project Id
        uummInstance.GetProjectIdByIndex.call(randomAddress, 0, {from: randomAddress})
        .then(assert.fail)
         .catch(function(error) {
                assert(
                    error.message.indexOf(errors.InvalidOpcode) !== -1,
                    'No project should exist yet: It should throw: '+errors.InvalidOpcode
                )
         })

        //ProposalLength
        let proposalsLength = await uummInstance.GetProposalsLength.call(nonexistentArguments.ProjectId, {from: randomAddress})
        assert.equal (proposalsLength.toNumber(), initialSateResults.proposalsLength, "No proposal should exist yet") 

        //PendingProposalLength
        let pendingProposalsLength = await uummInstance.GetPendingProposalsLength.call(nonexistentArguments.ProjectId, {from: randomAddress})
        assert.equal (pendingProposalsLength.toNumber(), initialSateResults.pendingProposalsLength, "No pending proposal should exist yet")

        //ProposalDetails
        uummInstance.GetProposalDetails.call(nonexistentArguments.ProjectId, nonexistentArguments.ProposalId, {from: randomAddress})
        .then(assert.fail)
        .catch(function(error) {
                assert(
                    error.message.indexOf(errors.InvalidOpcode) !== -1,
                    'No proposal exists yet: It should throw: '+errors.InvalidOpcode
                )
         })

        //ProposalState
        uummInstance.GetProposalState.call(nonexistentArguments.ProjectId, nonexistentArguments.ProposalId, {from: randomAddress})
        .then(assert.fail)
        .catch(function(error) {
                assert(
                    error.message.indexOf(errors.InvalidOpcode) !== -1,
                    'No proposal exists yet: It should throw: '+errors.InvalidOpcode
                )
         })


        //Pending proposal Id
        uummInstance.GetPendingProposalId.call(nonexistentArguments.ProjectId, nonexistentArguments.PendingProposalIndex, {from: randomAddress})
        .then(assert.fail)
        .catch(function(error) {
                assert(
                    error.message.indexOf(errors.InvalidOpcode) !== -1,
                    'No proposal exists yet: It should throw: '+errors.InvalidOpcode
                )
         })

        //TODO
        //GetContributorData
        //GetContributorsLength
        //GetContributorProposalsLength
    })

    //TODO: We should be able to get the generated projectId on the frontend
    let firstProjectId 
    it("...should create a new project", async function() {
        await uummInstance.CreateProject(firstProject.name, {from: projectCreator})
        let numberOfProjects = await uummInstance.GetProjectsLength.call(projectCreator , {from: randomAddress})
        assert.equal(numberOfProjects.toNumber(), firstProject.projectsLength, "One single project should exist")
    }) 

    it("...a new project should exist", async function() {
        firstProjectId = await uummInstance.GetProjectId(projectCreator, 0, {from: randomAddress})
        //TODO: Check the hash
        assert.isOk(firstProjectId,"should be a sha3 of the project creator address + a nonce")
    })

    //#0
    it("...project creator creates a new proposal", async function() {
        await uummInstance.CreateProposal(firstProjectId, firstProposal.title, firstProposal.reference, firstProposal.valueAmount,  {from: projectCreator})
        let proposalDetails = await uummInstance.GetProposalDetails.call(firstProjectId, 0, {from: randomAddress})

        let id = proposalDetails[0].toNumber()
        let author = proposalDetails[1]
        let title = proposalDetails[2]
        let reference = proposalDetails[3]
        let valueAmount = proposalDetails[4].toNumber()
        let creationTimestamp = proposalDetails[5].toNumber()

        let currentTimestamp = Date.now()/1000

        assert.equal(id, Data.proposal1.id, "Id of first proposal should be zero")
        assert.equal(author, projectCreator, "Author should be equal to the creator of the proposal")
        assert.equal(title, Data.proposal1.title, "Id of first proposal should be zero")
        assert.equal(valueAmount, Data.proposal1.valueAmount, "Value amount should match")
        assert.isAbove(creationTimestamp, currentTimestamp - 60, "Creation timestamp should more or less match current timestamp")
        assert.isBelow(creationTimestamp, currentTimestamp + 60, "Creation timestamp should more or less match current timestamp")
    })



    it("...one proposal should be created", async function() {
        let proposalsLength = await uummInstance.GetProposalsLength(firstProjectId, {from: randomAddress})
        assert.equal(proposalsLength.toNumber(), 1 ,"one project should be created")
    })

    //ProposalState #1
    it("...vote in favor of existing proposal", async function() {
        let transaction = await uummInstance.VoteProposal(firstProjectId, Data.proposal1.id, true, {from: projectCreator})
        //validateGasUsed(transaction.gasUsed,expectedGasUsed.voteProposalMin, expectedGasUsed.voteProposalMax)
        //validateProposalState(uummInstance, firstProject, 0, randomAddress, Data.proposal1.stateData[1])
    })

    it("...vote in favor of existing proposal", async function() {      

        //validateProposalState(uummInstance,firstProject, 0,randomAddress, Data.proposal1.stateData[1])
    })
    
})

async function validateProposalState (contract, projectId, proposalId, fromAddress, expected)
{
    let proposalState = await contract.GetProposalState(arguments.projectId, arguments.proposalId, {from: fromAddress})
    
    let id = proposalState[0].toNumber()
    let state = proposalState[1].toNumber()
    let positiveVotes = proposalState[2].toNumber()
    let negativeVotes = proposalState[3].toNumber()
    let creationTimestamp = proposalState[4].toNumber()
    let totalSupply = proposalState[5].toNumber()

    assert.equal(id, expected.id, "Id not matching")
    assert.equal(state, expected.state, "State not matching")
    assert.equal(positiveVotes, expected.positiveVotes, "Positive votes not matching")
    assert.equal(negativeVotes, expected.negativeVotes, "Negative votes not matching")
    assert.isAbove(creationTimestamp, expected.creationTimeStamp - 60, "Creation timestamp should more or less match current timestamp")
    assert.isBelow(creationTimestamp, expected.creationTimeStamp + 60, "Creation timestamp should more or less match current timestamp")
}

async function validateGasUsed(used, expectedMax, expectedMin)
{
    assert.isAbove(used, expectedMin, "To much gas was used")
    assert.isBelow(used, expectedMax, "Not enough gas was used")
}