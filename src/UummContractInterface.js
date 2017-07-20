import UummContract from '../build/contracts/Uumm.json'
import Config from '../truffle-config.js'
import Web3 from 'web3'
import State from './State.js'

class UummContractInterface
{
    //"User" makes reference to the current app user

    constructor()
    {
        this.userAddress

        var that=this

        this.setupFinished = new Promise((resolve, reject)=>
        {
            var {host, port} = Config.networks[process.env.NODE_ENV]
            
            const provider = new Web3.providers.HttpProvider('http://' + host + ':' + port)
            const contract = require('truffle-contract')
            const uummContract = contract(UummContract)

            uummContract.setProvider(provider)
            that.contractDeployedPromise = uummContract.deployed()
            that.contractInstance = {}
            that.accounts = {}
            
            const web3RPC = new Web3(provider)
            web3RPC.eth.getAccounts((error, accounts)=>
            {
                that.accounts = accounts
                this.userAddress = accounts[0]
                that.contractDeployedPromise
                .then(function(instance){
                    that.contractInstance = instance
                    resolve()
                })
            }) 
        })
    }

    isReady=()=>
    {
        return this.setupFinished
    }

    createProposal=(projectId, title, reference, valueAmount)=>
    {
        return new Promise((resolve, reject)=>
        {
            this.contractInstance.CreateProposal.estimateGas(projectId, title, reference, valueAmount)
            .then((estimatedGas)=>{
                return this.contractInstance.CreateProposal(projectId, title, reference, valueAmount, {from: this.userAddress, gas:estimatedGas})
            }).then((result)=> {
                resolve()
                return(this.getProposals(projectId))
            }).catch((error)=>{console.error(error)})
        })
    }

    createProject=(projectName)=>
    {
        return new Promise((resolve, reject)=>
        {
            this.contractInstance.CreateProject.estimateGas(projectName)
            .then((estimatedGas)=>{
                return this.contractInstance.CreateProject(projectName, {from: this.userAddress, gas:estimatedGas})
            }).then((result)=> {
                resolve()
                return(this.getUserProjects())
            }).catch((error)=>{console.error(error)})
        })
    }

    getUserProjects=()=>
    {     
        var that = this
        return new Promise(function (resolve, reject)
        {
            var array = []
            var loadedCount = 0

            that.contractInstance.GetProjectsLength.call(that.userAddress)
            .then(function(numberOfProjects)
            {
                //State.addVar("projectsLength", numberOfProjects)

                for(var i=0; i<numberOfProjects.toNumber(); i++)
                {
                    that.contractInstance.GetProjectIdByIndex.call(that.userAddress, i)
                    .then(function(projectId)
                    {
                        State.addProjectRef(projectId)

                        that.getProjectDetails(projectId)
                        .then(function(details)
                        {
                            array.push(details)
                            loadedCount ++
                            if(loadedCount===numberOfProjects.toNumber())
                                resolve(array)
                        }).catch(function(error){reject(error)})
                    })
                }
            
            }).catch(function(error){reject(error)})
        })
    }

    getProjectDetails=(projectId)=>
    {
        return new Promise( (resolve, reject)=>
        {
            if(!projectId)
                reject("projectId is not valid")
            this.contractInstance.GetProjectDetails.call(projectId)
            .then((details)=>
            {
                var projectDetails = {
                    'creator' : details[0],
                    'name' : details[1],
                    'id' : details[2],
                    'creationDate' : new Date (details[3].toNumber()*1000),
                    'totalSupply': details[4].toNumber(),
                    'requiredConcensus':details[5].toNumber()/100,
                    'requiredParticipation':details[6].toNumber()/100
                }

                State.addProject(projectId, projectDetails)

                resolve(projectDetails)

            }).catch(function(error){reject(error)})
        })         
    }

    getContributorDataByAddress=(projectId, contributorAddress)=>
    {
        return new Promise((resolve, reject)=>
        {
            //TODO: better vadilation
            if(!projectId)
                reject("projectId is not valid")
            if(!contributorAddress)
                reject("Invalid contributorAddress")


           this.contractInstance.GetContributorDataByAddress.call(projectId, contributorAddress)
            .then((details)=>
            {
                var contributorData = {
                    'id' : details[0].toNumber(),
                    'contributorAddress' : details[1],
                    'name' : details[2],
                    'valueTokens' : details[3].toNumber(),
                    'ethereumBalance': details[4].toNumber()
                }

                var project = {}
                project.contributors={}
                project.contributors[contributorData.contributorAddress]=contributorData

                State.addProject(projectId, project)

                resolve(contributorData)

            }).catch(function(error){reject(error)})
        })       
    }

    getUserContributorData = (projectId)=>
    {
        return this.getContributorDataByAddress(projectId, this.userAddress)
    }

    getProposals = (projectId) =>
    {
        return new Promise((resolve, reject)=>
        {
            this.contractInstance.GetProposalsLength.call(projectId)
            .then((numberOfProposals)=>
            {
                //TODO: record number of proposals so we don't need to reload them

                for(var proposalId=0; proposalId<numberOfProposals.toNumber(); proposalId++)
                {
                    this.getProposal(projectId, proposalId)
                }
            })
        })  
    }

    getProposal = (projectId, proposalId) =>
    {
        return new Promise((resolve, reject)=>
        {
            
            this.contractInstance.GetProposalDetails.call(projectId, proposalId)
            .then((proposalDetails)=>
            {
                var proposalDetails = {
                    'id' : proposalDetails[0].toNumber(),
                    'author' : proposalDetails[1],
                    'title' : proposalDetails[2],
                    'reference' : proposalDetails[3],
                    'valueAmount': proposalDetails[4].toNumber(),
                    'creationDate': new Date (proposalDetails[5].toNumber()*1000)
                }
            
                var project = {}
                project.proposals = []
                project.proposals[proposalDetails.id] = proposalDetails

                State.addProject(projectId, project)
            })

            //Proposal state
            this.contractInstance.GetProposalState.call(projectId, proposalId)
            .then((proposalState)=>
            {
                var proposalState = {
                    'id' : proposalState[0].toNumber(),
                    'state' : proposalState[1].toNumber(),
                    'positiveVotes' : proposalState[2].toNumber(),
                    'negativeVotes' : proposalState[3].toNumber(),
                    'creationDate': new Date (proposalState[4].toNumber()*1000),
                    'totalSupply': proposalState[5].toNumber()
                }
            
                var project = {}
                project.proposals = []
                project.proposals[proposalState.id] = proposalState

                State.addProject(projectId, project)
            })

        })  
    }

    voteProposal=(projectId, proposalId, vote)=>
    {
        return new Promise((resolve, reject)=>
        {
            this.contractInstance.VoteProposal.estimateGas(projectId, proposalId, vote)
            .then((estimatedGas)=>{
                return this.contractInstance.VoteProposal(projectId, proposalId, vote, {from: this.userAddress, gas:estimatedGas})
            }).then((result)=> {
                resolve()
                this.getProposals(projectId)
                this.getProjectDetails(projectId)
                this.getUserContributorData(projectId)
            }).catch((error)=>{console.error(error)})
        })
    }

    resolveProposal=( projectId,  proposalId)=>
    {
        return new Promise((resolve, reject)=>
        {
            this.contractInstance.ResolveProposal.estimateGas(projectId, proposalId)
            .then((estimatedGas)=>{
                return this.contractInstance.ResolveProposal(projectId, proposalId, {from: this.userAddress, gas:estimatedGas})
            }).then((result)=> {
                resolve()
                this.getProposals(projectId)
                this.getProjectDetails(projectId)
                this.getUserContributorData(projectId)
            }).catch((error)=>{console.error(error)})
        })
    }
}

const instance = new UummContractInterface();
export default instance;