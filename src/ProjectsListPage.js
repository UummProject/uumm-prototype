import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import Uumm from './UummContractInterface.js'
import ProjectsList from './ProjectsList.js'
import CreateProjectPage from './CreateProjectPage.js'
import RaisedButton from 'material-ui/RaisedButton'

class ProjectsListPage extends Component
{
    constructor(props) {
        super(props)
        window.location.hash = "projects"
        this.state = {"createDialogIsOpen" : false};
    }

    closeDialog=()=>
    {
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
            .then(()=>{})
            .catch((error)=>{console.error(error)})
    }

    onProjectSelected=(projectData)=>
    {
        this.props.onProjectSelected(projectData)
    }

    render() {

        return (
            <div>
                <RaisedButton
                    onTouchTap={this.onCreateProjectTap}
                    secondary={true}
                    disabled={!this.props.canWrite}
                    label ='Create a project'
                    />

                <ProjectsList
                    onProjectSelected={this.onProjectSelected}
                    userAddress={this.props.userAddress}
                    />

                <CreateProjectPage
                    open={this.state.createDialogIsOpen}
                    onCancel={this.closeDialog}
                    onCreate={this.createProject}
                    />
            </div>
        )
    }
}

export default ProjectsListPage
