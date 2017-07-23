import React from 'react';
import ProjectCard from './ProjectCard';
import UnconfirmedProjectCard from './UnconfirmedProjectCard';
import Uumm from './UummContractInterface.js'
import State from './State.js'

class ProjectsList extends React.Component
{
    constructor()
    {
        super();
 
        //TODO: Rendering network state doesn't belong here
        this.state = {"projects" : [],"statusText":"Checking network..."};
    }

    componentWillMount=()=>
    {
        Uumm.isReady()
        .then(()=>{
            this.setState({"statusText": "Connected"})
            Uumm.getUserProjects()
        }).catch(function(error){console.error(error)})
    }

    onProjectSelected = (projectData)=>
    {
        this.props.onProjectSelected(projectData)
    }
  
    render()
    {
        var projects = [];

        
        for (var projectId in State.data.projects)
        {
            if (!State.data.projects.hasOwnProperty(projectId))
                continue

            var projectData = State.data.projects[projectId]

            projects.push(
                <ProjectCard
                    key={projectId}
                    data={projectData}
                    onTouchTap={this.onProjectSelected}
                />);
        }

        //Unconfirmed projects
        for (var unconfirmedProjectId in State.data.unconfirmedProjects)
        {
            if (!State.data.unconfirmedProjects.hasOwnProperty(unconfirmedProjectId))
                continue

            var projectData = State.data.unconfirmedProjects[unconfirmedProjectId]

            projects.push(
                <UnconfirmedProjectCard
                    key={unconfirmedProjectId}
                    data={projectData}
                    onTouchTap={this.onProjectSelected}
                />);
        }

        return (
          <div>
                <p style={{'textAlign':'center', 'color':'0#666666'}}>
                    {this.state.statusText}
                </p> 

                <div>
                    {projects}
                </div>      
          </div>
        );
    }
}

export default ProjectsList;