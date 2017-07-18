
class State
{

    constructor()
    {
       this.data = {}
       this.data.projects={}
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

    addUser=(userAddress,data)=>
    {
        Object.assign(this.data.users[userAddress], data)
        this.stateUpdated()
    }

    addVar=(name,data)=>
    {
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

    addListener=(callback)=>
    {
        this.stateUpdatedCallbacks.push(callback)
    }

}

const instance = new State()

export default instance;