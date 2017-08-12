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
        valueAmount:9,
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
        valueAmount:30,
        creationTimestamp:0,
        stateData:[
            {
                //#0 Initial state
                //Token supply is updated because of previous proposal (1+9)
                state:ProposalState.PENDING,
                positiveVotes:0,
                negativeVotes:0,
                totalSupply:10,
                contributorVotes:[0]
            },
            {
                //#1 Project creator voted (10 tokens)
                state:ProposalState.PENDING,
                positiveVotes:10,
                negativeVotes:0,
                totalSupply:10,
                contributorVotes:[10]
            },
            {
                //#2 Project creator resolved (10 tokens)
                state:ProposalState.APPROVED,
                positiveVotes:10,
                negativeVotes:0,
                totalSupply:10,
                contributorVotes:[10]
            },
        ]
    }
]

exports.contributors =
[
    {
        //First contributor is empty
        id:0,
        contributorAddress:"",
        name:"",
        valueTokens:0,
        etherBalance:0
    },
    {
        id:1,
        contributorAddress:"",
        name:"",
        valueTokens:10,
        etherBalance:0.25
    },
    {
        id:2,
        contributorAddress:"",
        name:"",
        valueTokens:30,
        etherBalance:0.75
    }
]

