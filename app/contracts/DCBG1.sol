pragma solidity ^0.4.8;

contract DCBG1
{
    struct projectData
    {
        address  author;
        string  name;
        uint256  id;
        uint256 proposalExpiringTimeInSeconds; 
        uint  totalSupply;
        mapping (address=>int256) balances;
        valueRequestProposalData [] valueRequestProposals;
        uint256 [] valueRequestPendingProposals;
        uint256 valueRequestPendingProposalsLength;
        uint creationDate;
        uint256 concensusThresholdPermil;
    }
    
    
    enum proposalState
    {
        pending,
        approved,
        denied
    }
    
    struct valueRequestProposalData
    {
        address author;
        string title;
        string reference;
        uint256 valueAmount;
        proposalState state;
        mapping (address=>int256) votes;
        uint creationDate;
    }

    mapping (address => projectData[] ) projects;

    function DCBG1()  payable
    {
    } 

    function CreateProject(string name)  payable
    {
        if(msg.value == 0)
            revert();

        projectData memory project;
        project.creator = msg.sender;
        project.name = name;
        project.id = projects[msg.sender].length;
        project.totalSupply = 1;
        project.balances[msg.sender] = 1;
        project.creationDate = block.timestamp;
        project.concensusThresholdPermil = 618;
        project.valueRequestPendingProposalsLength = 0;
        projects.push(project);
    }
    
    function RequestValueProposal (address projectCreator, uint256 projectId, string title, string reference, uint256 valueAmount)
    {
        valueRequestProposalData memory proposal;
        proposal.author = msg.sender;
        proposal.title = title;
        proposal.reference = reference;
        proposal.valueAmount = valueAmount;
        proposal.state = proposalState.pending;
        projects[projectCreator][projectId].valueRequestProposal.push(proposal);
        projects[projectCreator][projectId].valueRequestPendingProposals[projects[projectCreator][projectId].valueRequestPendingProposalsLength];
    }
    
    function GetPendingProposals(address projectCreator, uint256 projectId,)
    {
        for (uint i = 0; i <  projects[projectCreator][projectId].valueRequestProposalsLength; i++)
        {
            
        }
            
    }
    
    function GetPendingProposalsLength(address projectCreator, uint256 projectId)
    {
        return valueRequestProposalsLength;
            
    }
}