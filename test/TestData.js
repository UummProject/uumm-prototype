exports.proposal1=
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
            state:0,
            positiveVotes:0,
            negativeVotes:0,
            totalSupply:1,
            contributorVotes:[0]//Represents the list of contributors, indexes matches accounts[]
        },
        {
            //#1 ProjectCreator (1 token) voted to approve
            state:0,
            positiveVotes:1,
            negativeVotes:0,
            totalSupply:1,
            contributorVotes:[1]
        },
        {
            //#2 ProjectCreator (1 token) voted to approve(again).
            //Data stays the same
            state:0,
            positiveVotes:1,
            negativeVotes:0,
            totalSupply:1,
            contributorVotes:[1]
        },
        {
            //#3 ProjectCreator (1 token) voted against. 
            //Postive vote goes back to zero, negative to one
            state:0,
            positiveVotes:0,
            negativeVotes:1,
            totalSupply:1,
            contributorVotes:[-1]
        },
        {
            //#4 ProjectCreator (1 token) voted in favor.
            //Negative vote goes back to zero, positive to  one
            state:0,
            positiveVotes:1,
            negativeVotes:0,
            totalSupply:1,
            contributorVotes:[1]
        }
    ]
}
