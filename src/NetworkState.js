import React from 'react'
import Paper from 'material-ui/Paper'
import Uumm from './UummContractInterface.js'
import Web3AutoSetup from './Web3AutoSetup.js'
import Video from 'react-youtube'

const containerStyle =
{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding : 15,
    marginTop : 0,
    margnBottom : 30,
    marginLeft:0,
    marginRight:0
}

const metamaskVideoId = "6Gf_kRE4MJU"

class NetworkState extends React.Component {

    constructor(props)
    {
        super()

        this.state = {
            "connected" : false,
            "network" : "",
            "provider":"Not found",
            "userAddress":""
        }

        Uumm.isReady()
        .then(()=>{
            this.setState({
                "connected": true,
                "userAddress":Web3AutoSetup.currentAccount,
                "provider":Web3AutoSetup.getCurrentProvider().name,
                "network": Web3AutoSetup.getCurrentNetwork().name
            })

        }).catch((error)=>{
            this.setState({"connected": false})
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

    render()
    { 
        var hint=undefined
        var hint1=undefined
        var video=undefined
        if(this.state.provider === "MetaMask" && !this.state.userAddress)
        {
            hint= "Unlock MetaMask to interact with the contract"
        }

        if(this.state.network !== "Ropsten")
            hint= "The contract is only deployed on the Ropsten Network. Make sure you are on the right network"

        if(!this.state.connected)
        {

            hint= "In order to access the contract we need a connection to Ethereum network."
            hint1 = "The easiest way is to install Metamaks"
            video =<Video videoId="6Gf_kRE4MJU"/>
        }


        var connected = "false"
        if(this.state.connected)
            connected = "true"

        var hintContainer=<div/>

        var installMetamaskContainer=
            <div>
                <p> {hint}</p>
                <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"> {"Install MetaMask"}</a>
                {video}
            </div>

        var details=(<Paper style={containerStyle} >
                        <p> Connected: {connected} </p> 
                        <p> Network: {this.state.network} </p> 
                        <p> Provider: {this.state.provider} </p>
                        <p> Your address: {this.state.userAddress}</p>
                
                    </Paper>)

        if(hint)
            hintContainer = (<Paper style={containerStyle} >
                                <div>
                                    <p> {hint}</p>
                                </div>
                            </Paper>)

        

        return (
            <div>  
               {hintContainer}
            </div>
        )
    }
}

export default NetworkState