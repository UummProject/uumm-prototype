pragma solidity ^0.4.8;

contract DCBG1
{
    struct projectData
    {
        address creator;
        string  name;
        uint256  id;
        uint256 proposalExpiringTimeInSeconds; 
        uint  totalSupply;
        mapping (address=>int256) balances;
        mapping (address=>int256) a;
        proposalData [] proposals;
        uint256 [] pendingProposals;
        uint256 pendingProposalsLength;
        uint256 proposalsIndex;
        uint creationDate;
        uint256 concensusThresholdPermil;
    }
    
    enum proposalState
    {
        pending,
        approved,
        denied
    }
    
    struct proposalData
    {
        uint256 id;
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
        projectData memory project;
        project.creator = msg.sender;
        project.name = name;
        project.id = projects[msg.sender].length;
        project.creationDate = block.timestamp;
        project.concensusThresholdPermil = 618;
        project.pendingProposalsLength = 0;
        projects[msg.sender].push(project);
    }
    
    function addValue(address projectCreator, uint256 projectId, address participant, uint256 valueAmount)
    {
        projects[projectCreator][projectId].balances[participant]+= valueAmount;
        projects[projectCreator][projectId].totalSupply += valueAmount;
        
    }
    
    function CreateRequestValueProposal (address projectCreator, uint256 projectId, string title, string reference, uint256 valueAmount)
    {
        proposalData memory proposal;
        proposal.id = projects[projectCreator][projectId].proposalsIndex++;
        proposal.author = msg.sender;
        proposal.title = title;
        proposal.reference = reference;
        proposal.valueAmount = valueAmount;
        proposal.state = proposalState.pending;
        projects[projectCreator][projectId].proposals.push(proposal);
        
        projects[projectCreator][projectId].pendingProposals.push(projects[projectCreator][projectId].proposals.lenght);
        projects[projectCreator][projectId].pendingProposalsLength ++;
        
    }
    
    function GetPendingProposal(address projectCreator, uint256 projectId, uint256 pendingIndex, uint256 proposalId) constant
    {
        if(projects[projectCreator][projectId].pendingProposals[pendingIndex].id != proposalId)
        {
            //log error. Some proposal may have been aproved and the index has shifted.
            throw;
        }
        return GetProposal(projectCreator, projectId, proposalId);
    }
    
    function  GetProposal(address projectCreator, uint256 projectId, uint256 proposalId) constant
        returns (uint256, address, string, string, uint256, proposalState)
    {
        return(
            projects[projectCreator][projectId].proposals[proposalId].id,
            projects[projectCreator][projectId].proposals[proposalId].author,
            projects[projectCreator][projectId].proposals[proposalId].title,
            projects[projectCreator][projectId].proposals[proposalId].reference,
            projects[projectCreator][projectId].proposals[proposalId].valueAmount,
            projects[projectCreator][projectId].proposals[proposalId].state,
            );
    }
    function GetPendingProposalsLength(address projectCreator, uint256 projectId) constant returns (uint256)
    {
        return projects[projectCreator][projectId].pendingProposalsLength;
    }
}
    
    