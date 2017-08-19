import React, { Component } from 'react'
import 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import InjectTapEventPlugin from 'react-tap-event-plugin'
import ProjectsListPage from './ProjectsListPage.js'
import ProjectPage from './ProjectPage.js'
import State from './State.js'
import NetworkState from './NetworkState.js'
import QueryString from 'query-string';
import Web3AutoSetup from './Web3AutoSetup.js'
import Uumm from './UummContractInterface.js'
import GreyTheme from './GreyTheme.js'
import './index.css'
import LandingPage from './LandingPage.js'
import Page from './Page.js'

InjectTapEventPlugin()

const PROJECTS_LIST="ProjectsList"
const PROJECT_PAGE="ProjectPage"
const LANDING_PAGE="LandingPage"

const contentStyle={margin:20, maxWidth:600, minWidth:400}

class App extends Component
{
    constructor(props)
    {
        super(props) 

        this.state ={
            'currentPage':LANDING_PAGE,
            'currentProjectId':0,
            'userAddress' : Web3AutoSetup.currentAccount,
            'canWrite':false
        }

        Uumm.isReady().then(()=>{
            this.onAddressChange(Web3AutoSetup.currentAccount)  
        })

        Web3AutoSetup.addAccountChangedListener(this.onAddressChange)
        State.addListener(this.onStateUpdated)
    }

    onAddressChange=(newAddress)=>
    {
        var canWrite = false

        if(Web3AutoSetup.isConnected() && newAddress)
            canWrite = true

        this.setState({
                'userAddress' : newAddress,
                'canWrite':canWrite
            })
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
        let page = QueryString.stringify(params)

        if(params.projectId)
        {
            this.setState({

                'currentPage':PROJECT_PAGE,
                'currentProjectId':params.projectId
                })
        }
        else if (page === 'projects')
        {
            this.setState({
                 'currentPage':PROJECTS_LIST
             })
        }
        else if (page === 'intro')
        {
            this.setState({
                 'currentPage':LANDING_PAGE,
            })
        }
    }

    onProjectSelected = (projectData)=>
    {
        this.setState({
            'currentPage':PROJECT_PAGE,
            'currentProjectId':projectData.id
        })
    }

    onActionButton = ()=>
    {
         this.setState({
            'currentPage':PROJECTS_LIST
        })
    }

    getCurrentPage = () =>
    {
         switch (this.state.currentPage)
         {
            case PROJECTS_LIST:
                return  <Page>   
                            <NetworkState/>
                            <ProjectsListPage
                                onProjectSelected={this.onProjectSelected}
                                userAddress={this.state.userAddress}
                                canWrite={this.state.canWrite}/>                             
                        </Page>

            case PROJECT_PAGE:
                return  <Page>   
                            <NetworkState/>
                            <ProjectPage
                                projectId={this.state.currentProjectId}
                                userAddress={this.state.userAddress}
                                canWrite={this.state.canWrite}/>                             
                        </Page>

            case LANDING_PAGE:
                return  <LandingPage
                    onActionButton={this.onActionButton}/>

            default :
                return  <LandingPage
                    onActionButton={this.onActionButton}/>
        }
    }

    render()
    {
        var page=this.getCurrentPage();
        return (
            <div className="App">
                <MuiThemeProvider muiTheme={GreyTheme}>              
                  {page}                              
                </MuiThemeProvider>
            </div>
        )
    }
}

export default App
