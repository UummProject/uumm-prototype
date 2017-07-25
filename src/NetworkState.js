import React from 'react'
import Paper from 'material-ui/Paper'
import Uumm from './UummContractInterface.js'
import Web3AutoSetup from './Web3AutoSetup.js'

const containerStyle =
{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    height : 80,
    padding : 15,
    marginTop : 10,
    margnBottom : 30,
    marginLeft:5,
    marginRight:5
}

class NetworkState extends React.Component {

    constructor(props)
    {
        super()

        this.state = {
            "connected" : false,
            "network" : "",
            "provider":"Not found",
            "userAddress":"-"
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
        this.setState({ "provider":Web3AutoSetup.getCurrentNetwork().name})
    }

    render()
    { 
        var connected = "false"
        if(this.state.connected)
            connected = "true"
        return (
            <Paper style={containerStyle} zDepth={0} >
                <p> Connected: {connected} </p> 
                <p> Network: {this.state.network} </p> 
                <p> Provider: {this.state.provider} </p>
                <p> Your address: {this.state.userAddress}</p>
                
            </Paper>
        )
    }
}

export default NetworkState