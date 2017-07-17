import React from 'react';
import ProjectCard from './ProjectCard';
import UummContractInterface from './UummContractInterface.js'

class ProjectsFeed extends React.Component
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
        var that = this
        UummContractInterface.isReady()
        .then(function(){
            UummContractInterface.getUserProjects()
            .then(function(projects){
                console.log(projects)
                that.setState({'projects':projects})
            }).catch(function(error){console.log(error)})
        }).catch(function(error){console.log(error)})   
    }
  
    render()
    {
    
        var projects = [];
        for (var i =0; i<this.state.projects.length; i++)
        {
            projects.push(
                <ProjectCard
                    key={this.state.projects[i].id}
                    data={this.state.projects[i]}/>);
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

export default ProjectsFeed;