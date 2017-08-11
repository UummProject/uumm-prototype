const ProposalState =
{
    PENDING:0,
    APPROVED:1,
    DENIED:2,
    EXPIRED:3
}

exports.proposals =
[
    {
        id:0,
        author:"",
        title:"First proposal title",
        reference:"ProposalReference",
        valueAmount:10,
        creationTimestamp:0,
        stateData:[
            {
                //#0 Initial state
                state:ProposalState.PENDING,
                positiveVotes:0,
                negativeVotes:0,
                totalSupply:1,
                contributorVotes:[0]//Represents the list of contributors, indexes matches accounts[]
            },
            {
                //#1 ProjectCreator (1 token) voted to approve
                state:ProposalState.PENDING,
                positiveVotes:1,
                negativeVotes:0,
                totalSupply:1,
                contributorVotes:[1]
            },
            {
                //#2 ProjectCreator (1 token) voted to approve(again).
                //Data stays the same
                state:ProposalState.PENDING,
                positiveVotes:1,
                negativeVotes:0,
                totalSupply:1,
                contributorVotes:[1]
            },
            {
                //#3 ProjectCreator (1 token) voted against. 
                //Postive vote goes back to zero, negative to one
                state:ProposalState.PENDING,
                positiveVotes:0,
                negativeVotes:1,
                totalSupply:1,
                contributorVotes:[-1]
            },
            {
                //#4 ProjectCreator (1 token) voted in favor.
                //Negative vote goes back to zero, positive to  one
                state:ProposalState.PENDING,
                positiveVotes:1,
                negativeVotes:0,
                totalSupply:1,
                contributorVotes:[1]
            },
            {
                //#5 Proposal is resolved and approved
                //State changes from PENDING to APPROVED
                //The totalSupply in the proposal remains the same
                state:ProposalState.APPROVED,
                positiveVotes:1,
                negativeVotes:0,
                totalSupply:1,
                contributorVotes:[1]
            }
        ]
    },
    {
        //Proposal[1]. Done by contributor1
        id:1,
        author:"",
        title:"Second proposal title",
        reference:"Proposal 2 Reference",
        valueAmount:20,
        creationTimestamp:0,
        stateData:[
            {
                //#0 Initial state
                //Token supply is updated because of previous proposal (1+10)
                state:ProposalState.PENDING,
                positiveVotes:0,
                negativeVotes:0,
                totalSupply:11,
                contributorVotes:[0]
            },
            {
                //#1 Project creator voted (11 tokens)
                state:ProposalState.PENDING,
                positiveVotes:11,
                negativeVotes:0,
                totalSupply:11,
                contributorVotes:[11]
            },
            {
                //#2 Project creator resolved (11 tokens)
                state:ProposalState.APPROVED,
                positiveVotes:11,
                negativeVotes:0,
                totalSupply:11,
                contributorVotes:[11]
            },
        ]
    }
]

