import React, { Component } from 'react'
import 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import InjectTapEventPlugin from 'react-tap-event-plugin'
import ProjectsListPage from './ProjectsListPage.js'
import ProjectDetails from './ProjectDetails.js'
import QueryString from 'query-string';

InjectTapEventPlugin()

const PROJECTS_LIST = "ProjectsList"
const PROJECT_DETAILS = "ProjectDetails"

class App extends Component
{
    constructor(props)
    {
      super(props)
       this.state ={
        'currentPage':PROJECTS_LIST,
        'currentProject':{}
        };
    }

    componentWillMount=()=>
    {
        window.addEventListener('hashchange', this.onHashChanged, false);
        this.onHashChanged()
    }

    onHashChanged=()=>
    {
        const parsedHash = QueryString.parse(location.hash)
        console.log(parsedHash)
        this.route(parsedHash)
    }

    route=(params)=>
    {
        //TODO: validate string
        if(params.projectId)
            this.state ={
                 'currentPage':PROJECTS_LIST,
                 'currentProject':params.projectId
                 };

    }

    onProjectSelected = (projectData)=>
    {
        console.log("app")
        this.setState({
            'currentPage':PROJECT_DETAILS,
            'currentProject':projectData
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
                    projectData={this.state.currentProject}/>
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
