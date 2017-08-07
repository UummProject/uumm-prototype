var Uumm = artifacts.require("./Uumm.sol");

const initialSateResults = {
    projectsLength : 0,
    projectId:0,
    proposalsLength:0,
    pendingProposalsLength:0
}

const arguments = {
    unexistingProjectId:"32bytesString"
}

contract('Uumm', async function(accounts)
{

    let projectCreator = accounts[0]

    let uummInstance = await  Uumm.deployed()

    it("...validate initial state data", async function()
    {
        //ProjectLength
        let projectsLength = await uummInstance.GetProjectsLength.call(projectCreator, {from: projectCreator});
        assert.equal (projectsLength.toNumber(), initialSateResults.projectsLength, "No project should exist yet");

        //Unexisting ProjectId
        //let projectId = await uummInstance.GetProjectIdByIndex.call(projectCreator, 0 );
        //assert.equal (projectId.toNumber(), initialSateResults.projectId, "No project should exist yet")

        //ProposalLength
        let proposalsLength = await uummInstance.GetProposalsLength.call(arguments.unexistingProjectId, {from: projectCreator});
        assert.equal (proposalsLength.toNumber(), initialSateResults.proposalsLength, "No proposal should exist yet"); 

        //PendingProposalLength
        let pendingProposalsLength = await uummInstance.GetPendingProposalsLength.call(arguments.unexistingProjectId, {from: projectCreator});
        assert.equal (pendingProposalsLength.toNumber(), initialSateResults.pendingProposalsLength, "No pending proposal should exist yet");    

    });


    it("...should create a project named 'Project 1'.", function() {

        let projectName = "Project1";

        uummInstance.CreateProject(projectName, {from: projectCreator})
        .then(function() {

            uummInstance.GetProjectsLength.call(accounts[0])
            .then(function(numberOfProjects) {

                assert.isNumber(numberOfProjects.toNumber(), "Should return number");
                assert.equal(numberOfProjects.toNumber(), 1, "One single project should exist");

            });
        });
    });    
});
