import React from 'react';
import ProjectCard from './ProjectCard';
import Uumm from './UummContractInterface.js'
import State from './State.js'

class ProjectsList extends React.Component
{
    constructor()
    {
        super();
 
        this.state = {"projects" : [],"statusText":"Checking network..."};
    }

    onResolve = (commitmentId) =>
    {
        this.props.onResolve(commitmentId);
    }

    componentWillMount()
    {
        Uumm.isReady()
        .then(function(){
            Uumm.getUserProjects()
        }).catch(function(error){console.log(error)})


        /*var that = this
        Uumm.isReady()
        .then(function(){
            Uumm.getUserProjects()
            .then(function(projects){
                that.setState({'projects':projects})
            }).catch(function(error){console.log(error)})
        }).catch(function(error){console.log(error)})*/
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
            var projectData = State.data.projects[projectId]

            projects.push(
                <ProjectCard
                    key={projectData.id}
                    data={projectData}
                    onTouchTap={this.onProjectSelected}/>);
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