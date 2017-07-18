import React, { Component } from 'react'
import 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import InjectTapEventPlugin from 'react-tap-event-plugin'
import Uumm from './UummContractInterface.js'
import ProjectsListPage from './ProjectsListPage.js'
import ProjectDetails from './ProjectDetails.js'


InjectTapEventPlugin()

const PROJECTS_LIST = "ProjectsList"
const PROJECT_DETAILS = "ProjectDetails"

class App extends Component
{
    constructor(props) {
      super(props)
       this.state = {'currentPage':PROJECT_DETAILS};
    }

    getCurrentPage = () =>
    {
         switch (this.state.currentPage)
         {
            case PROJECTS_LIST:
                return  <ProjectsListPage/>
            case PROJECT_DETAILS:
                return  <ProjectDetails/>
            default :
                null
        }
    }

    onProjectSelected=(projectId)=>
    {

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
