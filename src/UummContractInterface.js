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
        var that = this
        return new Promise(function (resolve, reject)
        {
            var array = []
            var loadedCount = 0

            that.uummContractInstance.GetProjectsLength.call(that.accounts[0])
            .then(function(numberOfProjects)
            {
                for(var i=0; i<=numberOfProjects.toNumber(); i++)
                {
                    that.getProjectDetails(that.accounts[0], i)
                    .then(function(details)
                    {

                        array.push(details)
                        loadedCount ++
                        console.log(loadedCount)
                        console.log(numberOfProjects.toNumber())

                        if(loadedCount===numberOfProjects.toNumber())
                            resolve(array)
                    }).catch(function(error){reject(error)})
                }
            
            }).catch(function(error){reject(error)})
        })
    }


    getProjectDetails(creatorAddress, projectId)
    {
        var that = this

        return new Promise(function (resolve, reject)
        {
           that.uummContractInstance.GetProjectDetails.call(creatorAddress, projectId)
            .then(function(details)
            {
                var projectDetails = {
                    'creator' : details[0],
                    'name' : details[1],
                    'id' : details[2].toNumber(),
                    'creationDate' : new Date (details[3].toNumber()*1000),
                    'totalSupply': details[4].toNumber()
                }
              resolve(projectDetails)
            }).catch(function(error){reject()})
        })         
    }

}

const instance = new UummContractInterface();
export default instance;