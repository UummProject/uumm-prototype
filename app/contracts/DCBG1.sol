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
        mapping (address=>uint256) balances;
        proposalData [] proposals;
        uint256 [] pendingProposals;
        uint256 pendingProposalsLength;
        uint256 proposalsIndex;
        uint creationTimestamp;
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
        uint creationTimestamp;
    }

    mapping (address => projectData[] ) projects;

    function DCBG1()  payable
    {
    } 

    function CreateProject(string name)  payable
    {
        /*projectData memory project;
        project.creator = msg.sender;
        project.name = name;
        project.id = projects[msg.sender].length;
        project.creationDate = block.timestamp;
        project.concensusThresholdPermil = 618;
        project.pendingProposalsLength = 0;
        
        projects[msg.sender].push(project);
        */
        
        uint256 projectId = projects[msg.sender].length;
        projects[msg.sender][projectId].creator = msg.sender;
        projects[msg.sender][projectId].name = name;
        projects[msg.sender][projectId].id = projectId;
        projects[msg.sender][projectId].creationTimestamp = block.timestamp;
        projects[msg.sender][projectId].concensusThresholdPermil = 618;
        projects[msg.sender][projectId].pendingProposalsLength = 0;
        
        addValueTokens(msg.sender, projectId, msg.sender, 1); //Creator recieves one single token
    }
    
    function addValueTokens(address projectCreator, uint256 projectId, address contributor, uint256 valueAmount) private
    {
        projects[projectCreator][projectId].balances[contributor]+= valueAmount;
        projects[projectCreator][projectId].totalSupply += valueAmount;
    }
    
    function CreateRequestValueProposal (address projectCreator, uint256 projectId, string title, string reference, uint256 valueAmount)
    {
        uint256 proposalId =  projects[projectCreator][projectId].proposals.length;
        
        proposalData memory proposal;
        proposal.id = proposalId;
        proposal.author = msg.sender;
        proposal.title = title;
        proposal.reference = reference;
        proposal.valueAmount = valueAmount;
        proposal.state = proposalState.pending;
        projects[projectCreator][projectId].proposals.push(proposal);
        
        projects[projectCreator][projectId].pendingProposals.push(proposalId);
        projects[projectCreator][projectId].pendingProposalsLength ++;
        
    }
    
    function GetProposalsLength(address projectCreator, uint256 projectId) constant returns (uint256)
    {
        return projects[projectCreator][projectId].proposals.length;
    }
   
    function GetPendingProposalsLength(address projectCreator, uint256 projectId) constant returns (uint256)
    {
        return projects[projectCreator][projectId].pendingProposalsLength;
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
            projects[projectCreator][projectId].proposals[proposalId].state
            );
    }
    
    function GetPendingProposal(address projectCreator, uint256 projectId, uint256 pendingIndex) constant
         returns (uint256, address, string, string, uint256, proposalState)
    {
        uint256  proposalId = projects[projectCreator][projectId].pendingProposals[pendingIndex];
        return GetProposal(projectCreator, projectId, proposalId);
    }
    
    function VotePendingProposal(address projectCreator, uint256 projectId, uint256 pendingIndex, uint256 proposalId, bool vote)
    {
        if(projects[projectCreator][projectId].balances[msg.sender]== 0)
            revert();
            
        if(projects[projectCreator][projectId].pendingProposals[pendingIndex] != proposalId)
        {
            //log error. Another proposal may have been aproved and the index has shifted.
            revert();
        }
        
        if (projects[projectCreator][projectId].proposals[proposalId].state != proposalState.pending)
            revert();
            
        if (projects[projectCreator][projectId].proposals[proposalId].creationTimestamp + projects[projectCreator][projectId].proposalExpiringTimeInSeconds > block.timestamp)
            revert();
        
        if(vote)
            projects[projectCreator][projectId].proposals[proposalId].votes[msg.sender] = int256(projects[projectCreator][projectId].balances[msg.sender]);
        else
            projects[projectCreator][projectId].proposals[proposalId].votes[msg.sender] = -1 * int256(projects[projectCreator][projectId].balances[msg.sender]);
    }
    
    function ResolveProposal(address projectCreator, uint256 projectId, uint256 pendingIndex, uint256 proposalId, bool vote)
    {
        
    }
}