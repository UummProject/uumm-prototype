import UummContract from '../build/contracts/Uumm.json'
import Config from '../truffle-config.js'
import Web3 from 'web3'
import State from './State.js'

class UummContractInterface
{
    //"User" makes reference to the current app user

    constructor()
    {
        this.userAddress=0
        this.provider = {}
        this.contractInstance = {}
        this.accounts = {}
        this.setupFinished = new Promise((resolve, reject)=>{
            this.resolveSetup = resolve
            this.rejectSetup = reject
        })

        window.addEventListener('load', ()=> {
            this.onWindowLoaded();
        })
    }

    onWindowLoaded=()=>
    {
        this.setupWeb3Provider()
    }

    isReady=()=>
    {
        return this.setupFinished
    }

    //resolves or rejects this.setupFinished promise
    setupWeb3Provider=()=>
    {
        if (typeof web3 !== 'undefined')
        {
             // Use Mist/MetaMask's provider
            //window.web3 = new Web3(window.web3.currentProvider);
            
            console.log("Using injected provider")
            window.web3 = new Web3(window.web3.currentProvider)
            this.provider = window.web3.currentProvider

         } else
         {
            //Use localhost provier geth/testrpc
            console.log(process.env)
            var {host, port} = Config.networks[process.env.NODE_ENV]
            this.provider = new Web3.providers.HttpProvider('http://' + host + ':' + port)
            window.web3 = new Web3(this.provider)
            console.log('Using http://' + host + ':' + port)
        }

        const contract = require('truffle-contract')
        const uummContract = contract(UummContract)

        uummContract.setProvider(this.provider)
        this.contractDeployedPromise = uummContract.deployed()
        
        window.web3.eth.getAccounts((error, accounts)=>
        {
            //Fails if not in the right network
            if(error)
            {
                console.error(error)
                this.rejectSetup(error)
            }
            

            this.accounts = accounts
            this.userAddress = accounts[0]
            this.contractDeployedPromise
            .then((instance)=>{
                this.contractInstance = instance
                this.resolveSetup()
            })
        }) 
    }

    createProposal=(projectId, title, reference, valueAmount)=>
    {
        var unconfirmedProposal = State.addUnconfirmedProposal(projectId, title)

        return new Promise((resolve, reject)=>
        {
            this.contractInstance.CreateProposal.estimateGas(projectId, title, reference, valueAmount)
            .then((estimatedGas)=>{
                return this.contractInstance.CreateProposal(projectId, title, reference, valueAmount, {from: this.userAddress, gas:estimatedGas})
            }).then((result)=> {

                
                this.getProposals(projectId).then(()=>
                {   
                    this.checkTransactionReceipt(result)
                    State.deleteUnconfirmedProposal(projectId, unconfirmedProposal)
                    resolve()
                }).catch((error)=>{reject(error)})

            }).catch((error)=>{
                State.deleteUnconfirmedProposal(projectId, unconfirmedProposal)
                reject(error)
            })
        })
    }

    createProject=(projectName)=>
    {
        return new Promise((resolve, reject)=>
        {
            var unconfirmedProjectId = State.addUnconfirmedProject(projectName)

            this.contractInstance.CreateProject.estimateGas(projectName)
            .then((estimatedGas)=>{

                var gasLimit = Math.round(estimatedGas * 1.1)
                return this.contractInstance.CreateProject(projectName, {from: this.userAddress, gas:gasLimit})
            }).then((result)=> {
                this.checkTransactionReceipt(result)
                this.getUserProjects().then(()=>{
                    State.deleteUnconfirmedProject(unconfirmedProjectId)
                    resolve()
                }).catch((error)=>{reject(error)})

            }).catch((error)=>{
                State.deleteUnconfirmedProject(unconfirmedProjectId)
                reject(error)
            })
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
                var projectDetails = State.getEmptyProject()

                projectDetails.creator = details[0],
                projectDetails.name = details[1],
                projectDetails.id = details[2],
                projectDetails.creationDate = new Date (details[3].toNumber()*1000),
                projectDetails.totalSupply=details[4].toNumber(),
                projectDetails.requiredConcensus=details[5].toNumber()/100,
                projectDetails.requiredParticipation=details[6].toNumber()/100

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
                //TODO: record number of proposals so we don't need to reload them all

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
                //TODO duplicated var. Move outside the callback
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

    checkTransactionReceipt=(result)=>
    {
        console.log(result)
        if(result.receipt.gasUsed === result.receipt.cumulativeGasUsed)
            console.error("Transaction may had run out of gas: gasUsed = cumulativeGasUsed = "+result.receipt.gasUsed)
    }
}

const instance = new UummContractInterface();
export default instance;