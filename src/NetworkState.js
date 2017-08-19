import React from 'react'
import Warning from './Warning.js'
import Uumm from './UummContractInterface.js'
import Web3AutoSetup from './Web3AutoSetup.js'
import Video from 'react-youtube'

class NetworkState extends React.Component {

    constructor(props)
    {
        super()

        this.state = {
            "loaded":false,
            "connected" : false,
            "network" : "",
            "provider":"Not found",
            "userAddress":""
        }

        Uumm.isReady()
        .then(()=>{
            this.setState({ 
                "loaded":true,
                "connected": true,
                "userAddress":Web3AutoSetup.currentAccount,
                "provider":Web3AutoSetup.getProviderInfo(),
                "network": Web3AutoSetup.getCurrentNetwork().name
            })

        }).catch((error)=>{
            this.setState({
                "loaded":true,
                "connected": false})
            console.error(error)
        })

        Web3AutoSetup.addAccountChangedListener(this.onAddressChange)
        Web3AutoSetup.addNetworkChangedListener(this.onNetworkChange)
    }

    onAddressChange=(newAddress)=>
    {
        console.log(newAddress)
        this.setState({
            "provider":Web3AutoSetup.getProviderInfo(),
            "userAddress":newAddress})
    }

    onNetworkChange=(newNetworkId)=>
    {
        this.setState({ "network":Web3AutoSetup.getCurrentNetwork().name})
    }

    getSmallHint=(text)=>
    {
        return (<Warning important >
            <div>
                <p> {text}</p>
            </div>
        </Warning>)
    }

    getInfuraHint=()=>
    {
        var exampleLink="https://xavivives.github.io/Uumm/#projectId=0x1568dca1bef08d48017f034930c853bd9487ba947eb58fd51db9979e6de638f9"
        var infuraLink ="https://infura.io/"
        return (<Warning important>
            <p> You're connected to ethereum using <a href={infuraLink}> {"Infura gateway"}</a></p>
            <p> This means that you can only read the content of already existing projects, <a href={exampleLink}> {"Like this one"}</a></p>
            <p> If you want to create a project or participate in one, we suggest you to  <a href="https://metamask.io/"> {"install MetaMask"}</a> browser extension</p>
        </Warning>)
    }

    getNoConnectionHint=()=>
    {
        return(<Warning important>
                    <h3> Unable to connect to the Ethereum blockchain</h3>
                   
                </Warning>)
    }

    getNoProviderHint=()=>
    {
        var video =<Video videoId="6Gf_kRE4MJU"/>

        return(<Warning important>
                    <h3> We need access to the Ethereum network.</h3>
                    <h3> The easiest way is to <a href="https://metamask.io/"> {"Install MetaMask"}</a> browser extension</h3>

                    <br/>
                    {video}
                </Warning>)
    }

    getDetails=()=>
    {
        var connected = "false"
        if(this.state.connected)
            connected = "true"

        return (<Warning>
                    <p> Connected: {connected} </p> 
                    <p> Network: {this.state.network} </p> 
                    <p> Provider: {this.state.provider.id} </p>
                    <p> Your address: {this.state.userAddress}</p>
                
                </Warning>)
    }

    render()
    { 
        var content=<div style={{width:600}}/>

        if(this.state.loaded)
        {
            if(!this.state.provider)
                content = this.getNoProviderHint()

            else if(this.state.network && this.state.network !== "Ropsten")
                content=this.getSmallHint("The contract is only deployed on the Ropsten Network. You're currently on "+this.state.network)

            else if(!this.state.connected)
                content=this.getNoConnectionHint()

            else if(this.state.provider.id === "Infura")
                content=this.getInfuraHint()

            else if(!this.state.provider.canWrite)
                content=this.getSmallHint("Unlock a " + this.state.provider.id + " account to interact with the contract")
        }

        return (

            <div>
                {content}
            </div>
        )
    }
}

export default NetworkState