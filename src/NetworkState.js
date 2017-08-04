import React from 'react'
import Paper from 'material-ui/Paper'
import Uumm from './UummContractInterface.js'
import Web3AutoSetup from './Web3AutoSetup.js'
import Video from 'react-youtube'

const containerStyle =
{
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding : 15,
    marginTop : 0,
    margnBottom : 30,
    marginLeft:0,
    marginRight:0
}

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
                "provider":Web3AutoSetup.getCurrentProvider().name,
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
        this.setState({ "userAddress":newAddress})
    }

    onNetworkChange=(newNetworkId)=>
    {
        this.setState({ "network":Web3AutoSetup.getCurrentNetwork().name})
    }

    getSmallHint=(text)=>
    {
        return (<Paper style={containerStyle} >
            <div>
                <p> {text}</p>
            </div>
        </Paper>)
    }

    getInfuraHint=()=>
    {
        var exampleLink="https://xavivives.github.io/Uumm/#projectId=0x1568dca1bef08d48017f034930c853bd9487ba947eb58fd51db9979e6de638f9"
        var infuraLink ="https://infura.io/"
        return (<Paper style={containerStyle} >
            <p> You're connected to ethereum using <a href={infuraLink}> {"Infura gateway"}</a></p>
            <p> This means that you can only read the content of already existing projects, <a href={exampleLink}> {"Like this one"}</a></p>
            <p> If you want to create a project or participate in one, we suggest you to  <a href="https://metamask.io/"> {"install MetaMask"}</a> browser extension</p>
        </Paper>)
    }

    getNoConnectionHint=()=>
    {

        var video =<Video videoId="6Gf_kRE4MJU"/>

        return(<Paper style={containerStyle} >
                    <h3> We need access to the Ethereum network.</h3>
                    <h3> The easiest way is to <a href="https://metamask.io/"> {"Install MetaMask"}</a> browser extension</h3>

                    <br/>
                    {video}
                </Paper>)
    }

    getDetails=()=>
    {
        var connected = "false"
        if(this.state.connected)
            connected = "true"

        return (<Paper style={containerStyle} >
                    <p> Connected: {connected} </p> 
                    <p> Network: {this.state.network} </p> 
                    <p> Provider: {this.state.provider} </p>
                    <p> Your address: {this.state.userAddress}</p>
                
                </Paper>)
    }

    render()
    { 
        var content=<div style={{width:600}}/>

        if(this.state.loaded)
        {
            if(!this.state.connected)
                content = this.getNoConnectionHint()      
             if(this.state.provider === "Infura")
                content=this.getInfuraHint()

            if(this.state.provider === "MetaMask" && !this.state.userAddress)
                content=this.getSmallHint("Unlock MetaMask to interact with the contract")

            if(this.state.connected && this.state.network !== "Ropsten")
                content=this.getSmallHint("The contract is only deployed on the Ropsten Network. Make sure you are on the right network")
        }

        return (

            <div>
                {content}
            </div>
        )
    }
}

export default NetworkState