exports.initialSateResults = {
    projectsLength : 0,
    projectId:0,
    proposalsLength:0,
    pendingProposalsLength:0,
    proposalDetails:
    {
        proposalId:"",
        author:"",
        title:0,
        reference:0,
        valueAmount:0,
        creationDate:0
    }
}

exports.nonexistentArguments = {
    ProjectId:"32bytesString",
    ProposalId:123,
    PendingProposalIndex:123
}

exports.firstProject =
{
    name:"First Project Name",
    projectsLength:1,
}

exports.proposal1=
{
    id:0,
    title:"First proposal title",
    reference:"ProposalReference",
    valueAmount:10,
    proposalsLength:1,
    state:0,

    stateData:[
        {
            id:0,
            state:0,
            positiveVotes:0,
            negativeVotes:0,
            creationTimestamp:0,
            totalSupply:0
        },
        {
            id:0,
            state:0,
            positiveVotes:0,
            negativeVotes:0,
            creationTimestamp:0,
            totalSupply:0
        },
    ]
}

exports.expectedGasUsed=
{
    voteProposalMin: 1000,
    voteProposalMax: 100
}

exports.expectedProposald=

exports.proposalStateArguments={
    projectId:1,
    proposalId:0
}