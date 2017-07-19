
class State
{

    constructor()
    {
       this.data = {}
       this.data.projects={}
       this.data.projectsRef=[]
       this.data.users={}
       this.stateUpdatedCallbacks=[]
    }

    addProject=(projectId, data)=>
    {

        if(!projectId || !data)
            return

        if(!this.data.projects[projectId])
            this.data.projects[projectId] = {} 

        Object.assign(this.data.projects[projectId], data)
        this.stateUpdated()
    }

    addProjectRef=(projectId)=>
    {
        for(var i = 0; i<this.data.projectsRef.length; i++)
        {
            if(projectId===this.data.projectsRef[i])
                return
        }
        this.data.projectsRef.push(projectId)
    }

    addUser=(userAddress,data)=>
    {
        Object.assign(this.data.users[userAddress], data)
        this.stateUpdated()
    }

    addVar=(name,data)=>
    {
        if(!this.data[name])
            this.data[name] = {} 
        Object.assign(this.data[name], data)
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
            'totalSupply': 0
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

    addListener=(callback)=>
    {
        this.stateUpdatedCallbacks.push(callback)
    }

}

const instance = new State()

export default instance;