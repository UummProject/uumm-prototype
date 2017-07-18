pragma solidity ^0.4.11;

contract Uumm
{
    struct projectData
    {
        //Project identity
        address creator;
        string  name;
        bytes32  id;
        uint creationTimestamp;

        //Governance features
        uint256 concensusThresholdPercentage; //what % of the voting participants (not percentage of contributors) is required for a proposal to be approved
        uint256 minimumParticipationPercentage; // what % of participation is required to resolve a proposal
        uint  totalSupply;

        //Proposal stuff
        uint256 proposalsIndex;
        uint256 [] pendingProposals;
        uint256 pendingProposalsLength;
        proposalData [] proposals;
        uint256 proposalExpiringTimeInSeconds; 
        
        //Contributors stuff 
        mapping (address=>uint256) contributorsRef; // points address to ContributorData index
        contributorData [] contributors;
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

    struct userData
    {
        address userAddress;
        bytes32 [] projectsRef; //list of projects that she contributed to (including created)

    }

    mapping (bytes32 => projectData ) projects;
    mapping (address => userData ) users;
    projectData emptyProject;
    contributorData emptyContributor;


    function Uumm()
    {
    } 

    function GetProjectId (address projectCreator, uint256 nonce) constant
        returns (bytes32)
    {
        return(sha3(projectCreator, nonce));
    }

    function CreateProject(string name)
    {
        bytes32 projectId = GetProjectId(msg.sender, users[msg.sender].projectsRef.length);

        projects[projectId].creator = msg.sender;
        projects[projectId].name = name;
        projects[projectId].id = projectId;
        projects[projectId].creationTimestamp = block.timestamp;
        projects[projectId].concensusThresholdPercentage = 618;
        projects[projectId].pendingProposalsLength = 0;

        contributorData memory emptyContributor;
        projects[projectId].contributors.push(emptyContributor); //We set it to zero to ensure that a none registered address defaults to it
        
        AddValueTokens(projectId, msg.sender, 1); //Creator recieves one single token
        users[msg.sender].projectsRef.push(projectId); 
    }

    /*function GetProjectsLength(address projectCreator) constant returns (uint256)
    {
        return projects[projectCreator].length;
    }*/

    function GetProjectDetails (bytes32 projectId) constant
        returns (address, string, bytes32, uint, uint256 )
    {
        return(
            projects[projectId].creator,
            projects[projectId].name,
            projects[projectId].id,
            projects[projectId].creationTimestamp,
            projects[projectId].totalSupply
            );
    }
    
    //CRITICAL
    function AddValueTokens(bytes32 projectId, address contributor, uint256 valueAmount) private
    {
        uint256 contributorId  =   projects[projectId].contributorsRef[contributor];
        projects[projectId].contributors[contributorId].valueTokens += valueAmount;
        projects[projectId].totalSupply += valueAmount;
    }

    function GetTotalSupply(bytes32 projectId) constant
        returns (uint256)
    {
        return projects[projectId].totalSupply;
    }
    
    function CreateProposal (bytes32 projectId, string title, string reference, uint256 valueAmount)
    {
        if(valueAmount!=0)
            throw;

        uint256 proposalId =  projects[projectId].proposals.length;

        proposalData memory proposal;
        proposal.id = proposalId;
        proposal.author = msg.sender;
        proposal.title = title;
        proposal.reference = reference;
        proposal.valueAmount = valueAmount;
        proposal.state = proposalState.pending;

        projects[projectId].proposals.push(proposal);
        
        projects[projectId].pendingProposals.push(proposalId);
        projects[projectId].pendingProposalsLength ++;

        uint256 contributorId = projects[projectId].contributorsRef[msg.sender];

        //new contributor
        if(contributorId == 0)
        {
            contributorId = projects[projectId].contributors.length;

            projects[projectId].contributors.push(emptyContributor);
            projects[projectId].contributors[contributorId].id = contributorId;
            projects[projectId].contributors[contributorId].contributorAddress = msg.sender;

            users[msg.sender].projectsRef.push(projectId);    
        }

        projects[projectId].contributors[contributorId].proposalsRef.push(proposalId);

        
    }
    
    function GetProposalsLength(bytes32 projectId) constant returns (uint256)
    {
        return projects[projectId].proposals.length;
    }
   
    function GetPendingProposalsLength(bytes32 projectId) constant returns (uint256)
    {
        return projects[projectId].pendingProposalsLength;
    }
    
    function  GetProposalDetails(bytes32 projectId, uint256 proposalId) constant
        returns (uint256, address, string, string, uint256, uint)
    {
        return(
            projects[projectId].proposals[proposalId].id,
            projects[projectId].proposals[proposalId].author,
            projects[projectId].proposals[proposalId].title,
            projects[projectId].proposals[proposalId].reference,
            projects[projectId].proposals[proposalId].valueAmount,
            projects[projectId].proposals[proposalId].creationTimestamp
            );
    }

    function  GetProposalState(bytes32 projectId, uint256 proposalId) constant
        returns (uint256, proposalState, uint256, uint256, uint)
    {
        return(
            projects[projectId].proposals[proposalId].id,
            projects[projectId].proposals[proposalId].state,
            projects[projectId].proposals[proposalId].positiveVotes,
            projects[projectId].proposals[proposalId].negativeVotes,
            projects[projectId].proposals[proposalId].creationTimestamp
            );
    }
    
    function GetPendingProposalId(bytes32 projectId, uint256 pendingIndex) constant
        returns (uint256)
    {
        return projects[projectId].pendingProposals[pendingIndex];
    }
    
    //CRITICAL
    function VotePendingProposal(bytes32 projectId, uint256 proposalId, bool vote)
    {
         uint256 contributorId  =   projects[projectId].contributorsRef[msg.sender];
        //Checks
        if(projects[projectId].contributors[contributorId].valueTokens == 0)
            revert();
        
        if (projects[projectId].proposals[proposalId].state != proposalState.pending)
            revert();
            
        if (projects[projectId].proposals[proposalId].creationTimestamp + projects[projectId].proposalExpiringTimeInSeconds > block.timestamp)
            revert();
        
        //Reset the vote if she has voted already. 
        if(projects[projectId].proposals[proposalId].votes[msg.sender] > 0)
        {
            projects[projectId].proposals[proposalId].positiveVotes -=  uint256(projects[projectId].proposals[proposalId].votes[msg.sender]);
            projects[projectId].proposals[proposalId].votes[msg.sender] = 0;
        }
        else if(projects[projectId].proposals[proposalId].votes[msg.sender] < 0)
        {
            projects[projectId].proposals[proposalId].negativeVotes -=  uint256(projects[projectId].proposals[proposalId].votes[msg.sender]);
            projects[projectId].proposals[proposalId].votes[msg.sender] = 0;
        }
        
        //Vote
        if(vote)
        {
            projects[projectId].proposals[proposalId].positiveVotes += projects[projectId].contributors[contributorId].valueTokens;
            projects[projectId].proposals[proposalId].votes[msg.sender] = int256(projects[projectId].contributors[contributorId].valueTokens);
        }
        else   
        {
            projects[projectId].proposals[proposalId].negativeVotes += projects[projectId].contributors[contributorId].valueTokens;
            projects[projectId].proposals[proposalId].votes[msg.sender] = -1 * int256(projects[projectId].contributors[contributorId].valueTokens);
        }
    }
    
    //CRITICAL

    //Anyone can resolve the proposal
    //Proposal can be resolved in two scenarios:
    //1- Concensus is over concensusThresholdPercentage among the all participants.
    //2- Expiration date has passed, and minimum participation percentage has been reached
    
    //TODO This function need to be expressed clearly. It is to convoluted right now.
    function ResolveProposal(bytes32 projectId, uint256 proposalId)
    {
        if (projects[projectId].proposals[proposalId].state != proposalState.pending)
            revert();
            
        if(!IsProposalMinimumParticipationReached (projectId, proposalId))
            revert();


        //Enough contributors had voted
        if((projects[projectId].proposals[proposalId].positiveVotes / projects[projectId].totalSupply) > projects[projectId].concensusThresholdPercentage)
        {
             ApproveProposal(projectId, proposalId, true);
             return;
        }
        if((projects[projectId].proposals[proposalId].negativeVotes / projects[projectId].totalSupply) > projects[projectId].concensusThresholdPercentage)
        {
             ApproveProposal(projectId, proposalId, false);
             return;
        }  

        //Deadline has expired
        if (projects[projectId].proposals[proposalId].creationTimestamp + projects[projectId].proposalExpiringTimeInSeconds < block.timestamp)
        {
            if(IsProposalConcensusThresholdReached(projectId, proposalId))
            {
                if(projects[projectId].proposals[proposalId].positiveVotes > projects[projectId].proposals[proposalId].negativeVotes)
                    ApproveProposal(projectId, proposalId, true);
                else
                    ApproveProposal(projectId, proposalId, false);

                return;
            }
        }
    }

    function ApproveProposal (bytes32 projectId, uint256 proposalId, bool approved) private
    {
        if(approved)
        {
            projects[projectId].proposals[proposalId].state = proposalState.approved;
            AddValueTokens(projectId, projects[projectId].proposals[proposalId].author, projects[projectId].proposals[proposalId].valueAmount);
        }
        else
        {
            projects[projectId].proposals[proposalId].state = proposalState.denied;
        }
    }
    
    //Have proposal reached concensus within current voters?
    // positiveVotes/totalNumberOfVotes > concensusThresholdPercentage
    // or negativeVotes/totalNumberOfVotes > concensusThresholdPercentage
    function IsProposalConcensusThresholdReached(bytes32 projectId, uint256 proposalId) constant
        returns (bool)
    {
        if(projects[projectId].proposals[proposalId].positiveVotes > projects[projectId].proposals[proposalId].negativeVotes)
        {
             if(projects[projectId].proposals[proposalId].positiveVotes / (projects[projectId].proposals[proposalId].positiveVotes + projects[projectId].proposals[proposalId].negativeVotes) > projects[projectId].concensusThresholdPercentage/100)
                return true;
            else
                return false;
        }
        else
        {
            if(projects[projectId].proposals[proposalId].negativeVotes / (projects[projectId].proposals[proposalId].positiveVotes + projects[projectId].proposals[proposalId].negativeVotes) > projects[projectId].concensusThresholdPercentage/100)
                return true;
            else
                return false;
        }
    }
    
    function IsProposalMinimumParticipationReached(bytes32 projectId, uint256 proposalId) constant
        returns (bool)
    {
        if((projects[projectId].proposals[proposalId].positiveVotes +
            projects[projectId].proposals[proposalId].negativeVotes) /
            projects[projectId].totalSupply >
            (projects[projectId].minimumParticipationPercentage /100))
            return true;
        else
            return false;
    }

    //CRITICAL
    function FundProject(bytes32 projectId) payable
    {
        //TODO Make sure that the function consumes less gas than the one available in a block
        if (msg.value == 0)
            revert();

        uint256 factor = msg.value / projects[projectId].totalSupply; //by default integer divisions use floor
        for (uint256 i = 0; i < projects[projectId].contributors.length; i++)
        {
            projects[projectId].contributors[i].ethereumBalance += (projects[projectId].contributors[i].valueTokens * factor);
        }
    }

    function WithdrawFunds(bytes32 projectId) 
    {
        uint256 contributorId  =   projects[projectId].contributorsRef[msg.sender];
        if(projects[projectId].contributors[contributorId].ethereumBalance == 0)
            revert();
            
        msg.sender.transfer(projects[projectId].contributors[contributorId].ethereumBalance);
    }

    function GetContributorId(bytes32 projectId, address contributorAddress) constant returns (uint256)
    {
        return projects[projectId].contributorsRef[contributorAddress];
    }

    function GetContributorDataByAddress(bytes32 projectId, address contributorAddress)  constant returns (uint256, address, string, uint256, uint256)
    {   
        uint256 contributorId  = projects[projectId].contributorsRef[contributorAddress];
        return GetContributorData(projectId, contributorId);
    }

    function GetContributorData(bytes32 projectId, uint256 contributorId)  constant returns (uint256, address, string, uint256, uint256)
    {
        return(
            projects[projectId].contributors[contributorId].id,
            projects[projectId].contributors[contributorId].contributorAddress,
            projects[projectId].contributors[contributorId].name,
            projects[projectId].contributors[contributorId].valueTokens,
            projects[projectId].contributors[contributorId].ethereumBalance
            );
    }

    function GetContributorProposalsLength(bytes32 projectId, uint256 contributorId) returns (uint256)
    {
        return(   projects[projectId].contributors[contributorId].proposalsRef.length );
    }
}