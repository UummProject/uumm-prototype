import UummContract from '../build/contracts/Uumm.json'
import Config from '../truffle-config.js'
import Web3 from 'web3'

class UummContractInterface
{
    constructor()
    {
        var that=this
        this.setupFinished = new Promise(function(resolve, reject){
        

            var {host, port} = Config.networks[process.env.NODE_ENV]
            
            const provider = new Web3.providers.HttpProvider('http://' + host + ':' + port)
            const contract = require('truffle-contract')
            const uummContract = contract(UummContract)

            uummContract.setProvider(provider)
            that.uummContractPromise = uummContract.deployed()
            that.uummContractInstance = {}
            that.accounts = {}

            
            const web3RPC = new Web3(provider)
            web3RPC.eth.getAccounts(function(error, accounts)
            {
                that.accounts = accounts
                that.uummContractPromise
                .then(function(instance){
                    that.uummContractInstance = instance
                    resolve()
                })
            }) 

        })
    }

    isReady()
    {
        return this.setupFinished
    }

    getUserProjects()
    {
        //return that.uummContractInstance.GetProjectsLength.call(that.accounts[0])
        //.then(function(numberOfProjects) {

            /*for(var id; id<=numberOfProjects; id++)
            {
                this.uummContractInstance.GetProjectDetails.call(this.accounts[0], id)
                }).then(function(projectDetails) {
                    projects.push(projectDetails)
                })
            }*/
            
        //})

        return this.getProjectDetails(this.accounts[0],0);

    }


    getProjectDetails(creatorAddress, projectId)
    {
        var that = this

        return new Promise(function (resolve, reject)
        {
          that.uummContractInstance.GetProposalDetails.call(creatorAddress,0,0)
                    .then(function(details)
                    {
                        resolve(details.toNumber())
                    })
        })        
    }

}

const instance = new UummContractInterface();
export default instance;