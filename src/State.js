import DeepAssign from 'deep-assign'

class State
{
    constructor()
    {
       this.data = {}
       this.data.projects={}
       this.data.unconfirmedProjects={}
       this.data.users={}
       this.stateUpdatedCallbacks=[]
       this.unconfirmedProjectsNonce = 0
       this.unconfirmedProposalsNonce = 0

       this.ProposalState ={
            PENDING : 0,
            APPROVED: 1,
            DENIED: 2,
            EXPIRED: 3
       }
    }

    addProject=(projectId, data)=>
    {
        if(!projectId || !data)
            throw("projectId or data was not defined")

        if(!this.data.projects[projectId])
            this.data.projects[projectId] = {} 

       DeepAssign(this.data.projects[projectId], data)
        this.stateUpdated()
    }

    addUnconfirmedProject=(projectName)=>
    {
        var project = this.getEmptyProject()
        project.name = projectName
        project.id =this.unconfirmedProjectsNonce
        this.unconfirmedProjectsNonce++
        this.data.unconfirmedProjects[this.unconfirmedProjectsNonce] = project
        this.stateUpdated()
        return project.id
    }


    addUnconfirmedProposal=(projectId, title)=>
    {
        var proposal = this.getEmptyProposal()
        proposal.title = title
        proposal.id =this.unconfirmedProposalsNonce
        this.unconfirmedProposalsNonce++
        this.data.projects[projectId].unconfirmedProposals[this.unconfirmedProjectsNonce] = proposal
        this.stateUpdated()
        return proposal.id
    }

    deleteUnconfirmedProject=(uncornfirmedProjectId)=>
    {
        delete this.data.unconfirmedProjects[uncornfirmedProjectId]
        this.stateUpdated()
    }

    addUser=(userAddress,data)=>
    {
       DeepAssign(this.data.users[userAddress], data)
        this.stateUpdated()
    }

    stateUpdated=()=>
    {
        for(var i = 0; i<this.stateUpdatedCallbacks.length; i++)
        {
            this.stateUpdatedCallbacks[i]()
        }
    }

    getEmptyProject=()=>
    {
        var projectDetails = {
            'creator' : "",
            'name' : "",
            'id' : "",
            'creationDate' : new Date (),
            'totalSupply': 0,
            'unconfirmedProposals':{}
        }
        return projectDetails
    }

    getEmptyContributor=()=>
    {
        var contributorData = {
            'id' : "",
            'contributorAddress' : "",
            'name' : "",
            'valueTokens' :0,
            'ethereumBalance':0
        }
        return contributorData
    }

    getEmptyProposal=()=>
    {
        var proposalData = {
            'id' : "",
            'author' : "",
            'title' : "",
            'reference' :"",
            'valueAmount':0,
            'proposalState':0,
            'votes':{},
            'positiveVotes': 0,
            'negativeVotes': 0,
            'creationDate': new Date()
        }
        return proposalData
    }

    addListener=(callback)=>
    {
        this.stateUpdatedCallbacks.push(callback)
    }
}

const instance = new State()

export default instance;