var Uumm = artifacts.require("./Uumm.sol");

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
    name:"First Project Name"
}
contract('Uumm', async function(accounts)
{
    let projectCreator = accounts[0];
    let randomAddress = accounts[9]; //Never writes (only calls, no transfers)

    let uummInstance = await  Uumm.deployed();

    it("...validate initial state data", async function()
    {
 
        //ProjectLength
        let projectsLength = await uummInstance.GetProjectsLength.call(randomAddress, {from: randomAddress});
        assert.equal (projectsLength.toNumber(), initialSateResults.projectsLength, "No project should exist yet");

        // project Id
        uummInstance.GetProjectIdByIndex.call(randomAddress, 0, {from: randomAddress})
        .then(assert.fail)
         .catch(function(error) {
                assert(
                    error.message.indexOf(errors.InvalidOpcode) !== -1,
                    'No project should exist yet: It should throw: '+errors.InvalidOpcode
                )
         });

        //ProposalLength
        let proposalsLength = await uummInstance.GetProposalsLength.call(nonexistentArguments.ProjectId, {from: randomAddress});
        assert.equal (proposalsLength.toNumber(), initialSateResults.proposalsLength, "No proposal should exist yet"); 

        //PendingProposalLength
        let pendingProposalsLength = await uummInstance.GetPendingProposalsLength.call(nonexistentArguments.ProjectId, {from: randomAddress});
        assert.equal (pendingProposalsLength.toNumber(), initialSateResults.pendingProposalsLength, "No pending proposal should exist yet");

        //ProposalDetails
        uummInstance.GetProposalDetails.call(nonexistentArguments.ProjectId, nonexistentArguments.ProposalId, {from: randomAddress})
        .then(assert.fail)
        .catch(function(error) {
                assert(
                    error.message.indexOf(errors.InvalidOpcode) !== -1,
                    'No proposal exists yet: It should throw: '+errors.InvalidOpcode
                )
         });

        //ProposalState
        uummInstance.GetProposalState.call(nonexistentArguments.ProjectId, nonexistentArguments.ProposalId, {from: randomAddress})
        .then(assert.fail)
        .catch(function(error) {
                assert(
                    error.message.indexOf(errors.InvalidOpcode) !== -1,
                    'No proposal exists yet: It should throw: '+errors.InvalidOpcode
                )
         });


        //Pending proposal Id
        uummInstance.GetPendingProposalId.call(nonexistentArguments.ProjectId, nonexistentArguments.PendingProposalIndex, {from: randomAddress})
        .then(assert.fail)
        .catch(function(error) {
                assert(
                    error.message.indexOf(errors.InvalidOpcode) !== -1,
                    'No proposal exists yet: It should throw: '+errors.InvalidOpcode
                )
         });

        //TODO
        //GetContributorData
        //GetContributorsLength
        //GetContributorProposalsLength

    });

    it("...should create a new project", async function() {

        await uummInstance.CreateProject(firstProject.name, {from: projectCreator})
       
        let numberOfProjects = await uummInstance.GetProjectsLength.call(projectCreator , {from: randomAddress});

        assert.equal(numberOfProjects.toNumber(), 1, "One single project should exist");
    });    
});
