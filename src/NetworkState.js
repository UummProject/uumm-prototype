import React from 'react'
import Paper from 'material-ui/Paper'
import Uumm from './UummContractInterface.js'

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
                "userAddress":Uumm.userAddress,
                "provider":Uumm.getCurrentProvider().name
            })

            Uumm.getCurrentNetwork().then((network)=>
            {
                this.setState({"network": network.name})
            })

        }).catch((error)=>{
            this.setState({"connected": false})
            console.error(error)
        })
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