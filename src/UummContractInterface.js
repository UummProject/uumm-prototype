import UummContract from '../build/contracts/Uumm.json'
import Config from '../truffle-config.js'
import Web3 from 'web3'

class UummContractInterface
{
    constructor()
    {
        var {host, port} = Config.networks[process.env.NODE_ENV]
        
        const provider = new Web3.providers.HttpProvider('http://' + host + ':' + port)

        const contract = require('truffle-contract')
        const uummContract = contract(UummContract)
        uummContract.setProvider(provider)
        this.uummContractInstance = {}
        this.uummContractPromise = uummContract.deployed()
        this.accounts = {}

        var that=this
        const web3RPC = new Web3(provider)
        web3RPC.eth.getAccounts(function(error, accounts)
        {
            that.accounts = accounts

           /* that.uummContractPromise.then(function(instance){
                that.uummContractInstance = instance;
                console.log(that.uummContractInstance)
                return that.uummContractInstance.CreateProject.estimateGas("Ultimate unicorn maker machine")
            }).then(function(estimatedGas){
                return that.uummContractInstance.CreateProject("Ultimate unicorn maker machine", {from: that.accounts[0], gas:estimatedGas})
            }).then(function(result) {
                return that.uummContractInstance.GetProjectsLength.call(that.accounts[0])
            }).then(function(result) {
                console.log(result.toNumber());
            })*/
        }) 
    }

    isReady()
    {
        return this.uummContractPromise
    }

    getUserProjects()
    {
        var projects = []
        var that = this
        console.log(this)



        return that.uummContractInstance.GetProjectsLength.call(that.accounts[0])
        .then(function(numberOfProjects) {

            /*for(var id; id<=numberOfProjects; id++)
            {
                this.uummContractInstance.GetProjectDetails.call(this.accounts[0], id)
                }).then(function(projectDetails) {
                    projects.push(projectDetails)
                })
            }*/
            
        })

    }

    

   
}

const instance = new UummContractInterface();
export default instance;