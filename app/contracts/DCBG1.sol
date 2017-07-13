pragma solidity ^0.4.11;

contract DCBG1
{
    struct projectData
    {
        address creator;
        string  name;
        uint256  id;
        uint256 proposalExpiringTimeInSeconds; 
        uint  totalSupply;
        mapping (address=>uint256) contributorsRef; // points address to ContributorData index
        contributorData [] contributors;
        proposalData [] proposals;
        uint256 [] pendingProposals;
        uint256 pendingProposalsLength;
        uint256 proposalsIndex;
        uint creationTimestamp;
        uint256 concensusThresholdPercentage; //what % of the voting participants (not percentage of contributors) is required for a proposal to be approved
        uint256 minimumParticipationPercentage; // what % of participation is required to resolve a proposal
    }
    
    enum proposalState
    {
        pending, //ongoing proposal, users can still vote
        approved, //succesfully resolved proposal, can't be change
        denied,// denied proposal, can't be changed
        expired // no minimum participation was reached
    }
    
    struct proposalData
    {
        uint256 id;
        address author;
        string title;
        string reference;
        uint256 valueAmount; 
        proposalState state;
        mapping (address=>int256) votes; //votes can be negative or positive
        uint256 positiveVotes;
        uint256 negativeVotes;
        uint creationTimestamp;
    }
    struct contributorData
    {
        uint256 id;
        address contributorAddress;
        string name;
        uint256 valueTokens;
        uint256 ethereumBalance;
        uint256 [] proposalsRef ;
    }

    mapping (address => projectData[] ) projects;
    projectData emptyProject;
    contributorData emptyContributor;


    function DCBG1()
    {
    } 

    function CreateProject(string name)
    {
        uint256 projectId = projects[msg.sender].length;

        //Only way I found to initialize an Struct containing array containing a struct.
        //See https://gist.github.com/xavivives/2aff3dd310563fc3272479382a84a638
        projects[msg.sender].push(emptyProject); 

        projects[msg.sender][projectId].creator = msg.sender;
        projects[msg.sender][projectId].name = name;
        projects[msg.sender][projectId].id = projectId;
        projects[msg.sender][projectId].creationTimestamp = block.timestamp;
        projects[msg.sender][projectId].concensusThresholdPercentage = 618;
        projects[msg.sender][projectId].pendingProposalsLength = 0;

        contributorData memory emptyContributor;
        projects[msg.sender][projectId].contributors.push(emptyContributor); //We set it to zero to ensure that a none registered address defaults to it
        
        AddValueTokens(msg.sender, projectId, msg.sender, 1); //Creator recieves one single token
    }

    function GetProjectsLength(address projectCreator) constant returns (uint256)
    {
        return projects[projectCreator].length;
    }
    
    //CRITICAL
    function AddValueTokens(address projectCreator, uint256 projectId, address contributor, uint256 valueAmount) private
    {
        uint256 contributorId  =   projects[projectCreator][projectId].contributorsRef[contributor];
        projects[projectCreator][projectId].contributors[contributorId].valueTokens += valueAmount;
        projects[projectCreator][projectId].totalSupply += valueAmount;
    }

    function GetTotalSupply(address projectCreator, uint256 projectId) constant returns (uint256)
    {
        return projects[projectCreator][projectId].totalSupply;
    }
    
    function CreateProposal (address projectCreator, uint256 projectId, string title, string reference, uint256 valueAmount)
    {
        if(valueAmount!=0)
            throw;

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

        uint256 contributorId = projects[projectCreator][projectId].contributorsRef[msg.sender];

        //new contributor
        if(contributorId == 0)
        {
            contributorId = projects[projectCreator][projectId].contributors.length;

            projects[projectCreator][projectId].contributors.push(emptyContributor);
            projects[projectCreator][projectId].contributors[contributorId].id = contributorId;
            projects[projectCreator][projectId].contributors[contributorId].contributorAddress = msg.sender;         
        }

        projects[projectCreator][projectId].contributors[contributorId].proposalsRef.push(proposalId);
        
    }
    
    function GetProposalsLength(address projectCreator, uint256 projectId) constant returns (uint256)
    {
        return projects[projectCreator][projectId].proposals.length;
    }
   
    function GetPendingProposalsLength(address projectCreator, uint256 projectId) constant returns (uint256)
    {
        return projects[projectCreator][projectId].pendingProposalsLength;
    }
    
    function  GetProposalDetails(address projectCreator, uint256 projectId, uint256 proposalId) constant
        returns (uint256, address, string, string, uint256, uint)
    {
        return(
            projects[projectCreator][projectId].proposals[proposalId].id,
            projects[projectCreator][projectId].proposals[proposalId].author,
            projects[projectCreator][projectId].proposals[proposalId].title,
            projects[projectCreator][projectId].proposals[proposalId].reference,
            projects[projectCreator][projectId].proposals[proposalId].valueAmount,
            projects[projectCreator][projectId].proposals[proposalId].creationTimestamp
            );
    }

    function  GetProposalState(address projectCreator, uint256 projectId, uint256 proposalId) constant
        returns (uint256, proposalState, uint256, uint256, uint)
    {
        return(
            projects[projectCreator][projectId].proposals[proposalId].id,
            projects[projectCreator][projectId].proposals[proposalId].state,
            projects[projectCreator][projectId].proposals[proposalId].positiveVotes,
            projects[projectCreator][projectId].proposals[proposalId].negativeVotes,
            projects[projectCreator][projectId].proposals[proposalId].creationTimestamp
            );
    }
    
    function GetPendingProposalId(address projectCreator, uint256 projectId, uint256 pendingIndex) constant
        returns (uint256)
    {
        return projects[projectCreator][projectId].pendingProposals[pendingIndex];
       
    }
    
    //CRITICAL
    function VotePendingProposal(address projectCreator, uint256 projectId, uint256 proposalId, bool vote)
    {
         uint256 contributorId  =   projects[projectCreator][projectId].contributorsRef[msg.sender];
        //Checks
        if(projects[projectCreator][projectId].contributors[contributorId].valueTokens == 0)
            revert();
        
        if (projects[projectCreator][projectId].proposals[proposalId].state != proposalState.pending)
            revert();
            
        if (projects[projectCreator][projectId].proposals[proposalId].creationTimestamp + projects[projectCreator][projectId].proposalExpiringTimeInSeconds > block.timestamp)
            revert();
        
        //Reset the vote if she has voted already. 
        if(projects[projectCreator][projectId].proposals[proposalId].votes[msg.sender] > 0)
        {
            projects[projectCreator][projectId].proposals[proposalId].positiveVotes -=  uint256(projects[projectCreator][projectId].proposals[proposalId].votes[msg.sender]);
            projects[projectCreator][projectId].proposals[proposalId].votes[msg.sender] = 0;
        }
        else if(projects[projectCreator][projectId].proposals[proposalId].votes[msg.sender] < 0)
        {
            projects[projectCreator][projectId].proposals[proposalId].negativeVotes -=  uint256(projects[projectCreator][projectId].proposals[proposalId].votes[msg.sender]);
            projects[projectCreator][projectId].proposals[proposalId].votes[msg.sender] = 0;
        }
        
        //Vote
        if(vote)
        {
            projects[projectCreator][projectId].proposals[proposalId].positiveVotes += projects[projectCreator][projectId].contributors[contributorId].valueTokens;
            projects[projectCreator][projectId].proposals[proposalId].votes[msg.sender] = int256(projects[projectCreator][projectId].contributors[contributorId].valueTokens);
        }
        else   
        {
            projects[projectCreator][projectId].proposals[proposalId].negativeVotes += projects[projectCreator][projectId].contributors[contributorId].valueTokens;
            projects[projectCreator][projectId].proposals[proposalId].votes[msg.sender] = -1 * int256(projects[projectCreator][projectId].contributors[contributorId].valueTokens);
        }
    }
    
    //Anyone can resolve the proposal
    //Proposal can be resolved in two scenarios:
    //1- Concensus is over concensusThresholdPercentage among the all participants.
    //2- Expiration date has passed, and minimum participation percentage has been reached
    
    
    function ResolveProposal(address projectCreator, uint256 projectId, uint256 proposalId)
    {
        if (projects[projectCreator][projectId].proposals[proposalId].state != proposalState.pending)
            revert();
            
        if(!IsProposalMinimumParticipationReached (projectCreator, projectId, proposalId))
            revert();


        //Enough contributors had voted
        if((projects[projectCreator][projectId].proposals[proposalId].positiveVotes / projects[projectCreator][projectId].totalSupply) > projects[projectCreator][projectId].concensusThresholdPercentage)
        {
             ApproveProposal(projectCreator, projectId, proposalId, true);
             return;
        }
        if((projects[projectCreator][projectId].proposals[proposalId].negativeVotes / projects[projectCreator][projectId].totalSupply) > projects[projectCreator][projectId].concensusThresholdPercentage)
        {
             ApproveProposal(projectCreator, projectId, proposalId, false);
             return;
        }  

        //Deadline has expired
        if (projects[projectCreator][projectId].proposals[proposalId].creationTimestamp + projects[projectCreator][projectId].proposalExpiringTimeInSeconds < block.timestamp)
        {
            if(IsProposalConcensusThresholdReached(projectCreator, projectId, proposalId))
            {
                if(projects[projectCreator][projectId].proposals[proposalId].positiveVotes > projects[projectCreator][projectId].proposals[proposalId].negativeVotes)
                    ApproveProposal(projectCreator, projectId, proposalId, true);
                else
                    ApproveProposal(projectCreator, projectId, proposalId, false);

                return;
            }
        }
    }

    function ApproveProposal (address projectCreator, uint256 projectId, uint256 proposalId, bool approved) private
    {
        if(approved)
        {
            projects[projectCreator][projectId].proposals[proposalId].state = proposalState.approved;
            AddValueTokens(projectCreator, projectId, projects[projectCreator][projectId].proposals[proposalId].author, projects[projectCreator][projectId].proposals[proposalId].valueAmount);
        }
        else
        {
            projects[projectCreator][projectId].proposals[proposalId].state = proposalState.denied;
        }
    }
    
    //Have proposal reached concensus within current voters?
    // positiveVotes/totalNumberOfVotes > concensusThresholdPercentage
    // or negativeVotes/totalNumberOfVotes > concensusThresholdPercentage
    function IsProposalConcensusThresholdReached(address projectCreator, uint256 projectId, uint256 proposalId) constant
        returns (bool)
    {
        if(projects[projectCreator][projectId].proposals[proposalId].positiveVotes > projects[projectCreator][projectId].proposals[proposalId].negativeVotes)
        {
             if(projects[projectCreator][projectId].proposals[proposalId].positiveVotes / (projects[projectCreator][projectId].proposals[proposalId].positiveVotes + projects[projectCreator][projectId].proposals[proposalId].negativeVotes) > projects[projectCreator][projectId].concensusThresholdPercentage/100)
                return true;
            else
                return false;
        }
        else
        {
            if(projects[projectCreator][projectId].proposals[proposalId].negativeVotes / (projects[projectCreator][projectId].proposals[proposalId].positiveVotes + projects[projectCreator][projectId].proposals[proposalId].negativeVotes) > projects[projectCreator][projectId].concensusThresholdPercentage/100)
                return true;
            else
                return false;
        }
    }
    
    function IsProposalMinimumParticipationReached(address projectCreator, uint256 projectId, uint256 proposalId) constant
        returns (bool)
    {
        if((projects[projectCreator][projectId].proposals[proposalId].positiveVotes +
            projects[projectCreator][projectId].proposals[proposalId].negativeVotes) /
            projects[projectCreator][projectId].totalSupply >
            (projects[projectCreator][projectId].minimumParticipationPercentage /100))
            return true;
        else
            return false;
    }

    //CRITICAL
    function FundProject(address projectCreator, uint256 projectId) payable
    {
        //TODO Make sure that the function consumes less gas than the one available in a block
        if (msg.value == 0)
            revert();

        uint256 factor = msg.value / projects[projectCreator][projectId].totalSupply; //by default integer divisions use floor
        for (var i = 0; i < projects[projectCreator][projectId].contributors.length; i++)
        {
            projects[projectCreator][projectId].contributors[i].ethereumBalance += (projects[projectCreator][projectId].contributors[i].valueTokens * factor);
        }
    }

    function WithdrawFunds(address projectCreator, uint256 projectId) 
    {
        uint256 contributorId  =   projects[projectCreator][projectId].contributorsRef[msg.sender];
        if(projects[projectCreator][projectId].contributors[contributorId].ethereumBalance == 0)
            revert();
            
        msg.sender.transfer(projects[projectCreator][projectId].contributors[contributorId].ethereumBalance);
    }

    function GetContributorId(address projectCreator, uint256 projectId, address contributorAddress) constant returns (uint256)
    {
        return projects[projectCreator][projectId].contributorsRef[contributorAddress];
    }

    function GetContributorDataByAddress(address projectCreator, uint256 projectId, address contributorAddress)  constant returns (uint256, address, string, uint256, uint256)
    {   
        uint256 contributorId  =   projects[projectCreator][projectId].contributorsRef[contributorAddress];
        return GetContributorData(projectCreator,projectId, contributorId);
    }
     

    function GetContributorData(address projectCreator, uint256 projectId, uint256 contributorId)  constant returns (uint256, address, string, uint256, uint256)
    {
        return(
            projects[projectCreator][projectId].contributors[contributorId].id,
            projects[projectCreator][projectId].contributors[contributorId].contributorAddress,
            projects[projectCreator][projectId].contributors[contributorId].name,
            projects[projectCreator][projectId].contributors[contributorId].valueTokens,
            projects[projectCreator][projectId].contributors[contributorId].ethereumBalance
            );
    }

    function GetContributorProposalsLength(address projectCreator, uint256 projectId, uint256 contributorId) returns (uint256)
    {
        return(   projects[projectCreator][projectId].contributors[contributorId].proposalsRef.length );
    }
}