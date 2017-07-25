import Web3 from 'web3'

class Web3AutoSetup
{
    constructor()
    {
        console.log("Web3AutoSetup ")
        this.currentAccount = 0
        this.currentNetworkId = 0
        this.provider = {}
        this.accountListeners = []
        this.networkListeners = []
        this.checkInterval = undefined

        window.addEventListener('load', ()=> {
            this.onWindowLoaded();
        })
    }

    onWindowLoaded=()=>
    {
        //this.setup()
    }

    isReady=()=>
    {
        return this.setupFinished
    }

    //resolves or rejects this.setupFinished promise
    setup=(customProvider, forceCustomProvider = false)=>
    {
        return new Promise((resolve, reject)=>{

            //Set the provider
            if (typeof web3 !== 'undefined' && !forceCustomProvider)
            {
                // Use injected provider,  Mist/MetaMask's
                window.web3 = new Web3(window.web3.currentProvider)
                this.provider = window.web3.currentProvider   
             }
            else if(customProvider)
            {
                //Use fallback provider localhost provier geth/testrpc
                this.provider = new Web3.providers.HttpProvider(customProvider)
                window.web3 = new Web3(this.provider)
            }
            else
            {
                reject("No provider detected. Set your own like so: Web3AutoSetup.setup('http://localhost:8546')")
                return
            }

            console.log("Using "+ this.getCurrentProvider().type + " provider: "+ this.getCurrentProvider().name +" in "+this.getNetworkDetails(this.currentNetworkId).name+" network." )
            
            window.web3.version.getNetwork((error, networkId) =>
            {
                if(error)
                    reject(error)

                this.checkNetworkChange(networkId)
            })
            //Check if accounts are available and set the [0] as a main one
            window.web3.eth.getAccounts((error, accounts)=>
            {
                if(error)
                    reject(error)
            
                this.checkAccountChange(accounts[0])
            })

            //we keep checking to see if the user changes the account/network (likely if she's using Metamask or an external provider)
            //We use sync methods, supported by Metamask (https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md)
            
            if(checkInterval)
                clearInterval(checkInterval)

            var checkInterval = setInterval(()=>
            {
                //this.checkNetworkChange(window.web3.version.network)
                //this.checkAccountChange(window.web3.eth.accounts[0])
            }, 500);

            resolve()
        })
    }

    getProvider=()=>
    {
        return this.provider
    }

    //check if address had changed and notify listeners if so
    checkAccountChange=(newAddress)=>
    {
        if(this.currentAccount != newAddress)
        {
            this.currentAccount = newAddress
            for(var i = 0; i< this.accountListeners.length; i++)
                this.accountListeners[i](newAddress)
        }
    }

    checkNetworkChange=(newNetworkId)=>
    {
        if(this.currentNetworkId != newNetworkId)
        {
            console.log("New network: "+newNetworkId)
            this.currentNetworkId = newNetworkId
            for(var i = 0; i< this.networkListeners.length; i++)
                this.networkListeners[i](newNetworkId)
        }
    }

    addAccountChangedListener=(callback)=>
    {
        this.accountListeners.push(callback)
    }

    addNetworkChangedListener=(callback)=>
    {
        this.accountListeners.push(callback)
    }
    
    getNetworkDetails=(networkId)=>
    {
        var network = {}
        switch (networkId) {
            case "1":
                network.name= "Main-net"
                break
            case "2":
                network.name= "Morden"
                break
            case "3":
                network.name= "Ropsten"
                break
            default:
                network.name= "Unknown"
        }
        return network
    }

    getCurrentNetwork=()=>
    {
        return this.getNetworkDetails(this.currentNetworkId)
    }

    getCurrentProvider=()=>
    {
        var provider={}
        var constructorName = this.provider.constructor.name
        switch (constructorName) {
             case "MetamaskInpageProvider":
                provider.name= "MetaMask"
                provider.type= "injected"
                break
             case "HttpProvider":
                provider.name= this.provider.host
                provider.type= "custom"
                provider.rpcHost= this.provider.host
                break
             default:
                 provider.name= "Unknown"
        }
        return provider
    }
}

const instance = new Web3AutoSetup()
export default instance;