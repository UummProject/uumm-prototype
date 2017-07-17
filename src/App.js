import React, { Component } from 'react'
import 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import InjectTapEventPlugin from 'react-tap-event-plugin'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import Uumm from './UummContractInterface.js'
import ProjectFeed from './ProjectFeed.js'
import CreateProjectPage from './CreateProjectPage.js'

InjectTapEventPlugin()

const FloatingButtonStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    zIndex:100
};

class App extends Component
{
    constructor(props) {
      super(props)
       this.state = {"createDialogIsOpen" : false};
    }

    closeDialog=()=>
    {
        console.log("cancel")
        this.setState({'createDialogIsOpen':false})
    }


    onCreateProjectTap=(projectName)=>
    {
        this.setState({'createDialogIsOpen':true})
    }

    createProject=(projectName)=>
    {
        this.setState({'createDialogIsOpen':false})
        Uumm.createProject(projectName).catch(function(error){console.warn(error)})
    }

    render() {
        return (
            <div className="App">
                <MuiThemeProvider>
                    <div>
                        <FloatingActionButton onTouchTap={this.onCreateProjectTap} secondary={true} style={FloatingButtonStyle}>
                            <AddIcon />
                        </FloatingActionButton>

                        <ProjectFeed/>

                        <CreateProjectPage
                            open={this.state.createDialogIsOpen}
                            onCancel={this.closeDialog}
                            onCreate={this.createProject}/>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default App
