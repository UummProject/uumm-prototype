import Web3 from 'web3'

const Providers={
    INJECTED:"*",
    UNKNOWN:"unknown",
    METAMASK:"MetMask",
    PARITY:"Parity",
    MIST:"Mist",
    INFURA:"Infura",
    LOCALHOST:"localhost"
}

const InjectedProviders=[
    Providers.INJECTED,
    Providers.METAMASK,
    Providers.PARITY,
    Providers.MIST
]

const ReadOnlyProviders=[
    Providers.INFURA
]

const HttpProviders=[
    Providers.INFURA,
    Providers.LOCALHOST
]

class Web3AutoSetup
{
    constructor()
    {
        this.currentAccount = undefined
        this.currentNetworkId = undefined
        this.injectedProvider = undefined
        this.provider = {}
        this.providerInfo = {}
        this.accountListeners = []
        this.networkListeners = []
        this.checkInterval = undefined
    }

    //Should be called after window load event
    setup=(providersList=[])=>
    {
        return new Promise((resolve, reject)=>{

            // Let's store the injected provider if exist
            if (typeof web3 !== 'undefined') 
                this.injectedProvider = window.web3.currentProvider

            if(providersList.length===0)
                providersList.push(Providers.INJECTED)

            for(var i = 0; i<providersList.length;i++)
            {
                if(this.tryProvider(providersList[i]))
                    break
            }

            this.providerInfo = this.currentProvider()
           
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

            console.log("Using "+ this.getCurrentProviderInfo().type + " provider: "+ this.getCurrentProviderInfo().name +" in "+this.getNetworkDetails(this.currentNetworkId).name+" network, with address: "+this.currentAccount )
            
            resolve()
        })
    }

    tryProvider=(providerId)=>
    {
        if(this.isProviderType(InjectedProviders, providerId))
        {
            if(this.injectedProvider)
                this.provider = this.injectedProvider
            else
                return false
        }
        else if (this.isProviderType(HttpProviders, providerId))
        {
            this.provider = new Web3.providers.HttpProvider(providerId)
        }
        else
        {
            console.error("Unkown provider, trying to use it anyway",providerId)
            this.provider = providerId
        } 

        window.web3 = new Web3(this.provider)

        return window.web3.isConnected()
    }

    isReady=()=>
    {
        return this.setupFinished
    }   

    isProviderType=(providersList, providerId)=>
    {
       return providersList.indexOf(providerId)!== -1
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

    getCurrentProviderInfo=()=>
    {
        var providerInfo={
            name:undefined,
            type:undefined,
            host:undefined,
            couldWrite:undefined,
            canWrite:undefined
        }

        //provider.contsructor.name seems not reliable 
        //In certain circumstances that I can't figure out is "i" when it should be "HttpProvider"
        //Using it only to detecte MetaMask
        if(this.provider.constructor.name === "MetamaskInpageProvider")        
        {
            providerInfo.name= Providers.METAMASK
            providerInfo.type= "injected"
            providerInfo.couldWrite = true
        }

        else if(this.provider.host.indexOf("infura")!==-1) 
        {
            providerInfo.name= Providers.INFURA
            providerInfo.type= "http"
            providerInfo.couldWrite = false
            providerInfo.canWrite = false
            providerInfo.host= this.provider.host
        } 
            
        else if(this.provider.host.indexOf("localhost")!==-1)  
        { 
            providerInfo.name= Providers.LOCALHOST
            providerInfo.type= "http"
            providerInfo.canWrite = false
            providerInfo.couldWrite = true
            providerInfo.host= this.provider.host
        }

        else
        {
            providerInfo.name= Providers.UNKNOWN
            providerInfo.host= this.provider.host
        }

        return providerInfo
    }

    isConnected=()=>
    {
        return window.web3.isConnected()
    }
}

const instance = new Web3AutoSetup()
export default instance;