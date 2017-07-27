import React, { Component } from 'react'
import 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import InjectTapEventPlugin from 'react-tap-event-plugin'
import ProjectsListPage from './ProjectsListPage.js'
import ProjectDetails from './ProjectDetails.js'
import State from './State.js'
import NetworkState from './NetworkState.js'
import QueryString from 'query-string';
import Web3AutoSetup from './Web3AutoSetup.js'
import Uumm from './UummContractInterface.js'
import Paper from 'material-ui/Paper'

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import GreyTheme from './GreyTheme.js'

InjectTapEventPlugin()

const PROJECTS_LIST="ProjectsList"
const PROJECT_DETAILS="ProjectDetails"

class App extends Component
{
    constructor(props)
    {
        super(props) 

        Uumm.isReady().then(()=>{
            this.setState({"userAddress" : Web3AutoSetup.currentAccount})
            
        })

        Web3AutoSetup.addAccountChangedListener(this.onAddressChange)
        State.addListener(this.onStateUpdated)

        this.state ={
            'currentPage':PROJECTS_LIST,
            'currentProjectId':0,
            "userAddress" : Web3AutoSetup.currentAccount
        }
    }

    onAddressChange=(newAddress)=>
    {
        this.setState ({"userAddress" : newAddress})
    }

    componentWillMount=()=>
    {
        window.addEventListener('hashchange', this.onHashChanged, false);
        this.onHashChanged()
    }

    onStateUpdated=()=>
    {
        this.forceUpdate();
    }

    onHashChanged=()=>
    {
        const parsedHash = QueryString.parse(location.hash)
        this.route(parsedHash)
    }

    route=(params)=>
    {
        //TODO: validate string
        if(params.projectId)
        {
            this.setState({
                'currentPage':PROJECT_DETAILS,
                'currentProjectId':params.projectId
                })
        }
        else
        {
            this.setState({
                 'currentPage':this.PROJECT_LIST,
            })
        }
    }

    onProjectSelected = (projectData)=>
    {
        this.setState({
            'currentPage':PROJECT_DETAILS,
            'currentProjectId':projectData.id
        })
    }

    getCurrentPage = () =>
    {
         switch (this.state.currentPage)
         {
            case PROJECTS_LIST:
                return  <ProjectsListPage
                    onProjectSelected={this.onProjectSelected}
                    userAddress={this.state.userAddress}/>
            case PROJECT_DETAILS:
                return  <ProjectDetails
                    projectId={this.state.currentProjectId}
                    userAddress={this.state.userAddress}/>
            default :
                return <ProjectsListPage
                    onProjectSelected={this.onProjectSelected}
                    userAddress={this.state.userAddress}/>
        }
    }

    render(){
        console.log(GreyTheme)
        var page=this.getCurrentPage();
        return (
            <div className="App">
                <MuiThemeProvider muiTheme={GreyTheme}>
                    <div>
                        <NetworkState/>

                        <div style={{
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"flexStart"
                            }}>
                            <Paper zDepth={0} style={{margin:10, width:600}}>
                                {page}                              
                            </Paper>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default App
