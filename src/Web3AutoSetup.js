import Web3 from 'web3'

const InjectedProviders ={
    INJECTED:"*",
    METAMASK:"metamask",
    PARITY:"parity",
    MIST:"mist"
}

class Web3AutoSetup
{
    constructor()
    {
        this.currentAccount = undefined
        this.currentNetworkId = undefined
        this.provider = {}
        this.accountListeners = []
        this.networkListeners = []
        this.checkInterval = undefined
        this.injectedProvider = undefined
    }

    //Should be called after window load event
    setup=(providersList=[])=>
    {
        return new Promise((resolve, reject)=>{

            // Let's store the injected provider if exist
            if (typeof web3 !== 'undefined') 
                this.injectedProvider = window.web3.currentProvider

            if(providersList.length===0)
                providersList.push(InjectedProviders.INJECTED)

            for(var i = 0; i<providersList.length;i++)
            {
                if(this.tryProvider(providersList[i]))
                    break
            }
           
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
            
            if(this.checkInterval)
                clearInterval(this.checkInterval)

            this.checkInterval = setInterval(()=>
            {
                this.checkNetworkChange(window.web3.version.network)
                this.checkAccountChange(window.web3.eth.accounts[0])
            }, 500);

            console.log("Using "+ this.getCurrentProvider().type + " provider: "+ this.getCurrentProvider().name +" in "+this.getNetworkDetails(this.currentNetworkId).name+" network, with address: "+this.currentAccount )
            
            resolve()
        })
    }

    tryProvider=(providerRef)=>
    {
        if(this.isInjectedProvider(providerRef))
        {
            if(this.injectedProvider)
                this.provider = this.injectedProvider
            else
                return false
        }
        else if (this.isHttpProvider(providerRef))
        {
            this.provider = new Web3.providers.HttpProvider(providerRef)
        }
        else
        {
            console.error("Unkown provider, trying to use it anyway",providerRef)
            this.provider = providerRef
        } 

        window.web3 = new Web3(this.provider)

        return window.web3.isConnected()
    }

    isReady=()=>
    {
        return this.setupFinished
    }   

    isInjectedProvider=(providerRef)=>
    {
        switch (providerRef) {
            case InjectedProviders.INJECTED:
                return true
            case InjectedProviders.METAMASK:
                return true
            case InjectedProviders.PARITY:
                return true
            default:
                return false
        }
        return false
    }

    isHttpProvider=(providerRef)=>
    {
        //TODO: Do a proper check
        return providerRef.indexOf("http")!==-1
    }

    getProvider=()=>
    {
        return this.provider
    }

    checkAccountChange=(newAddress)=>
    {
        if(this.currentAccount !== newAddress)
        {
            this.currentAccount = newAddress
            for(var i = 0; i< this.accountListeners.length; i++)
                this.accountListeners[i](newAddress)
        }
    }

    checkNetworkChange=(newNetworkId)=>
    {
        if(this.currentNetworkId !== newNetworkId)
        {
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
        console.log(constructorName)
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

    isConnected=()=>
    {
        return window.web3.isConnected()
    }
}

const instance = new Web3AutoSetup()
export default instance;