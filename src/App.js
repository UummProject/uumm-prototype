import React, { Component } from 'react'
import 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import InjectTapEventPlugin from 'react-tap-event-plugin'
import ProjectsListPage from './ProjectsListPage.js'
import ProjectDetails from './ProjectDetails.js'
import State from './State.js'
import QueryString from 'query-string';

InjectTapEventPlugin()

const PROJECTS_LIST = "ProjectsList"
const PROJECT_DETAILS = "ProjectDetails"

class App extends Component
{
    constructor(props)
    {
      super(props)
      State.addListener(this.onStateUpdated)

       this.state ={
        'currentPage':PROJECTS_LIST,
        'currentProjectId':0
        };
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
        console.log(parsedHash)
        this.route(parsedHash)
    }

    route=(params)=>
    {
        console.log(params.projectId)
        //TODO: validate string
        if(params.projectId)
            this.state ={
                 'currentPage':PROJECT_DETAILS,
                 'currentProjectId':params.projectId
                 };
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
                    onProjectSelected={this.onProjectSelected}/>
            case PROJECT_DETAILS:
                return  <ProjectDetails
                    projectId={this.state.currentProjectId}/>
            default :
                return <ProjectsListPage
                    onProjectSelected={this.onProjectSelected}/>
        }
    }

    render() {

        var page = this.getCurrentPage();
        return (
            <div className="App">
                <MuiThemeProvider>
                    <div>
                        {page}
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default App
