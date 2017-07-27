import React from 'react';
import ProjectCard from './ProjectCard';
import UnconfirmedProjectCard from './UnconfirmedProjectCard';
import Uumm from './UummContractInterface.js'
import State from './State.js'

class ProjectsList extends React.Component
{
    componentWillMount=()=>
    {
        Uumm.isReady()
        .then(()=>{
            Uumm.getUserProjects().catch(function(error){console.error(error)})
        }).catch(function(error){console.error(error)})
    }

    componentWillReceiveProps=(nextProps)=>
    {
        if(nextProps.userAddress===this.props.userAddress)
            return

        Uumm.isReady()
        .then(()=>{
            Uumm.getUserProjects().catch(function(error){console.error(error)})
        }).catch(function(error){console.error(error)})
    }

    onProjectSelected = (projectData)=>
    {
        this.props.onProjectSelected(projectData)
    }
  
    render()
    {

        var projects = [];
        var user= State.getEmptyUser()

        if(State.data.users[this.props.userAddress])
            user = State.data.users[this.props.userAddress]

        for(var i = 0; i < user.projectsRef.length; i++)
        {
            var projectId = State.data.users[this.props.userAddress].projectsRef[i]

            if(!State.data.projects[projectId])
                continue

            var projectData = State.data.projects[projectId]

            projects.push(
                <ProjectCard
                    key={projectId}
                    data={projectData}
                    userAddress={this.props.userAddress}
                    onTouchTap={this.onProjectSelected}
                />);
        }

        //Unconfirmed projects
        for (var unconfirmedProjectId in State.data.unconfirmedProjects)
        {
            if (!State.data.unconfirmedProjects.hasOwnProperty(unconfirmedProjectId))
                continue

            var unconfirmedProjectData = State.data.unconfirmedProjects[unconfirmedProjectId]

            projects.push(
                <UnconfirmedProjectCard
                    key={unconfirmedProjectId}
                    data={unconfirmedProjectData}
                    userAddress={this.props.userAddress}
                    onTouchTap={this.onProjectSelected}
                />);
        }

        var hint=undefined
        if(projects.length===0)
            hint="This account has no associated projects. Why don't you create a new one?"

        return (
          <div>
                <p style={{'textAlign':'center', 'color':'0#666666'}}></p> 

                <div>
                    {hint}
                    {projects}
            
                </div>      
          </div>
        );
    }
}

export default ProjectsList;