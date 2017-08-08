var Uumm = artifacts.require("./Uumm.sol")

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
    proposalsLength:0

}

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

    let firstProjectId
    it("...should create a new project", async function() {
        await uummInstance.CreateProject(firstProject.name, {from: projectCreator})
        let numberOfProjects = await uummInstance.GetProjectsLength.call(projectCreator , {from: randomAddress})
        assert.equal(numberOfProjects.toNumber(), firstProject.projectsLength, "One single project should exist")
    }) 

    it("...should get the new project id", async function() {
        firstProjectId = await uummInstance.GetProjectId(projectCreator, 0, {from: randomAddress})
        //TODO: Check the hash

        assert.isOk(firstProjectId,"should be a sha3 of the project creator address + a nonce")
    })

    it("...project creator should create a new proposal", async function() {
        await uummInstance.CreateProposal(firstProjectId, firstProposal.title, firstProposal.reference, firstProposal.valueAmount,  {from: projectCreator})
        let proposalDetails = await uummInstance.GetProposalDetails.call(firstProjectId, 0, {from: randomAddress})

        let id = proposalDetails[0].toNumber()
        let author = proposalDetails[1]
        let title = proposalDetails[2]
        let reference = proposalDetails[3]
        let valueAmount = proposalDetails[4].toNumber()
        let creationTimestamp = proposalDetails[5].toNumber()

        let currentTimestamp = Date.now()/1000

        assert.equal(id, firstProposal.id, "Id of first proposal should be zero")
        assert.equal(author, projectCreator, "Author should be equal to the creator of the proposal")
        assert.equal(title, firstProposal.title, "Id of first proposal should be zero")
        assert.equal(valueAmount, firstProposal.valueAmount, "Value amount should match")
        assert.isAbove(creationTimestamp, currentTimestamp - 60, "Creation timestamp should more or less match current timestamp")
        assert.isBelow(creationTimestamp, currentTimestamp + 60, "Creation timestamp should more or less match current timestamp")
    })

    it("...One proposal should be created", async function() {
        firstProjectId = await uummInstance.GetProposalsLength(projectId, {from: randomAddress})
        assert.equal(firstProposal.proposalsLength,"one project should be created")
    })


   
})
