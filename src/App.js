import React, { Component } from 'react'
import 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import InjectTapEventPlugin from 'react-tap-event-plugin'
import ProjectsListPage from './ProjectsListPage.js'
import ProjectDetails from './ProjectDetails.js'


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
        'currentProjectData':{}
        };
    }

    onProjectSelected = (projectData)=>
    {
        console.log("app")
        this.setState({
            'currentPage':PROJECT_DETAILS,
            'currentProjectData':projectData
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
                    projectData={this.state.currentProjectData}/>
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
