import Web3 from 'web3'

const Providers={
    INJECTED:"*",
    UNKNOWN:"unknown",
    METAMASK:"MetaMask",
    PARITY:"Parity",
    MIST:"Mist",
    INFURA:"Infura",
    LOCALHOST:"localhost"
}

const ProviderTypes={
    INJECTED:"injected",
    HTTP:"http"
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
    setup=(providersList=[], updateInterval=1000)=>
    {
        return new Promise((resolve, reject)=>{

            // Let's store the injected provider if exist, we may use it or not
            if (typeof web3 !== 'undefined') 
                this.injectedProvider = window.web3.currentProvider

            if(providersList.length===0)
                providersList.push(Providers.INJECTED)

            for(var i = 0; i<providersList.length;i++)
            {
                if(this.tryProvider(providersList[i]))
                    break
            }

            this.providerInfo = this.getCurrentProviderInfo()
            console.log(this.providerInfo)

            this.checkNetwork()

            resolve()

            //No need to check for account changes, and network?
            if(!this.providerInfo.couldWrite)
                return    
            
            this.checkAccount()

            if(this.checkInterval)
                clearInterval(this.checkInterval)

            this.checkInterval = setInterval(()=>
            {
                this.checkNetwork()
                this.checkAccount()
            }, updateInterval)
            
        })
    }

    //see if the user changes the account, or unlocks it
    checkAccount=()=>
    {
        window.web3.eth.getAccounts((error, accounts)=>
        {
            if(error)
                console.error(error)
        
            this.checkAccountChange(accounts[0])
        })
    }


    checkAccountChange=(newAddress)=>
    {
        if(newAddress)
            this.providerInfo.canWrite = true
        else
             this.providerInfo.canWrite = false

        if(this.currentAccount !== newAddress)
        {
            this.currentAccount = newAddress
            for(var i = 0; i< this.accountListeners.length; i++)
                this.accountListeners[i](newAddress)
        }
    }

    //checks if we still on the same Ethereum network: Mainnet/Ropsten...
    checkNetwork=()=>
    {
        window.web3.version.getNetwork((error, networkId) =>
        {
            if(error)
                console.error(error)

            this.checkNetworkChange(networkId)
        })
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

    tryProvider=(providerRef)=>
    {
        if(this.isProviderType(InjectedProviders, providerRef))
        {
            if(this.injectedProvider)
                this.provider = this.injectedProvider
            else
                return false
        }
        else if (this.isUrl(providerRef))
        {
            this.provider = new Web3.providers.HttpProvider(providerRef)
        }
        else
        {
            console.error("Unkown provider, trying to use it anyway", providerRef)
            this.provider = providerRef
        } 

        window.web3 = new Web3(this.provider)

        return window.web3.isConnected()
    }

    isReady=()=>
    {
        return this.setupFinished
    } 

    isUrl=(url)=>
    {  //TODO: Do a proper check
        return url.indexOf("http")!==-1
    }


    isProviderType=(providersList, providerId)=>
    {
       return providersList.indexOf(providerId)!== -1
    }

    getProvider=()=>
    {
        return this.provider
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
            id:undefined,
            type:undefined,
            host:undefined,
            couldWrite:true, //refering to the blockchain. By default we assume that a provider could write
            canWrite:undefined //refering to the blockchain. Meaning that an account it's unlocked
        }

        //provider.contsructor.name is not reliable to detect the current Provider.
        //In certain circumstances that I can't figure out is "i" when it should be "HttpProvider"
        if(this.provider.constructor.name === "MetamaskInpageProvider")        
        {
            providerInfo.id= Providers.METAMASK
            providerInfo.type= ProviderTypes.INJECTED
        }

        else if(this.provider.constructor.name === "EthereumProvider")        
        {
            providerInfo.id= Providers.MIST
            providerInfo.type= ProviderTypes.INJECTED
        }

         else if(this.provider.constructor.name === "o")        
        {
            providerInfo.id= Providers.PARITY
            providerInfo.type= ProviderTypes.INJECTED
        }

        else if(this.provider.host.indexOf("infura")!==-1) 
        {
            providerInfo.id= Providers.INFURA
            providerInfo.type= ProviderTypes.HTTP
            providerInfo.canWrite = false          
        } 
            
        else if(this.provider.host.indexOf("localhost")!==-1)  
        { 
            providerInfo.id= Providers.LOCALHOST
            providerInfo.type= ProviderTypes.HTTP
            providerInfo.canWrite = false
        }

        else
        {
            providerInfo.id= Providers.UNKNOWN
        }

        providerInfo.couldWrite = !this.isProviderType(ReadOnlyProviders, providerInfo.id)
        providerInfo.host= this.provider.host

        return providerInfo
    }

    getProviderInfo=()=>
    {
        return this.providerInfo
    }

    isConnected=()=>
    {
        return window.web3.isConnected()
    }
}

const instance = new Web3AutoSetup()
export default instance