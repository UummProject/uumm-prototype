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
            //Initial state
            state:0,
            positiveVotes:0,
            negativeVotes:0,
            totalSupply:1
        },
        {
            //ProjectCreator (1token) voted to approve
            state:0,
            positiveVotes:1,
            negativeVotes:0,
            totalSupply:1
        },
        {
            //ProjectCreator (1token) voted to approve(again). Data stays the same
            state:0,
            positiveVotes:1,
            negativeVotes:0,
            totalSupply:1
        },
        {
            //ProjectCreator (1token) voted against. Postive vote goes back to zero, negative incresases
            state:0,
            positiveVotes:0,
            negativeVotes:1,
            totalSupply:1
        },
    ]
}
