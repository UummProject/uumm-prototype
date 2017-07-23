import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import Uumm from './UummContractInterface.js'
import ProjectsList from './ProjectsList.js'
import CreateProjectPage from './CreateProjectPage.js'


const FloatingButtonStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    zIndex:100
};

class ProjectsListPage extends Component
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
       
        Uumm.createProject(projectName)
            .then(()=>{console.log("Project created")})
            .catch((error)=>{console.error(error)})
    }

    onProjectSelected=(projectData)=>
    {
        this.props.onProjectSelected(projectData)
    }

    render() {
        return (

            <div>
                <FloatingActionButton
                    onTouchTap={this.onCreateProjectTap}
                    secondary={true}
                    style={FloatingButtonStyle}>
                    <AddIcon />
                </FloatingActionButton>

                <ProjectsList onProjectSelected={this.onProjectSelected}/>

                <CreateProjectPage
                    open={this.state.createDialogIsOpen}
                    onCancel={this.closeDialog}
                    onCreate={this.createProject}/>
            </div>
        )
    }
}

export default ProjectsListPage
