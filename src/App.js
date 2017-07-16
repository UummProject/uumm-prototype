import React, { Component } from 'react'
import UummContract from '../build/contracts/Uumm.json'
import Config from '../truffle-config.js'
import Web3 from 'web3'
import 'material-ui'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import InjectTapEventPlugin from 'react-tap-event-plugin';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';

InjectTapEventPlugin();

const FloatingButtonStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    zIndex:100
};


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0
    }
  }

  componentWillMount() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    // So we can update state later.
   
  }

    onNewProject()
    {
        var {host, port} = Config.networks[process.env.NODE_ENV]
        
        const provider = new Web3.providers.HttpProvider('http://' + host + ':' + port)

        const contract = require('truffle-contract')
        const uummContract = contract(UummContract)
        uummContract.setProvider(provider)
        var uummContractInstance



        const web3RPC = new Web3(provider)
        web3RPC.eth.getAccounts(function(error, accounts)
        {
            console.log(accounts)
            
            uummContract.deployed()
            .then(function(instance){
                uummContractInstance = instance;
                return uummContractInstance.CreateProject.estimateGas("Ultimate unicorn maker machine")
            }).then(function(estimatedGas){
                return uummContractInstance.CreateProject("Ultimate unicorn maker machine", {from: accounts[0], gas:estimatedGas})
            }).then(function(result) {
                return uummContractInstance.GetProjectsLength.call(accounts[0])
            }).then(function(result) {
                console.log(result.toNumber());
            })

        }) 
    }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
            <div>
                <FloatingActionButton onTouchTap={this.onNewProject} secondary={true} style={FloatingButtonStyle}>
                    <AddIcon />
                </FloatingActionButton>
            </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App
