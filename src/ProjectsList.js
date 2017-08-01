import React from 'react';
import ProjectCard from './ProjectCard';
import UnconfirmedProjectCard from './UnconfirmedProjectCard';
import Uumm from './UummContractInterface.js'
import State from './State.js'
import Divider from 'material-ui/Divider';

class ProjectsList extends React.Component
{
    componentWillMount=()=>
    {
        this.state={"contentLoaded":false}
        Uumm.isReady()
        .then(()=>{
            Uumm.getUserProjects()
            .then(()=>{
                this.setState({"contentLoaded":true})
            }).catch(function(error){console.error(error)})
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
                />)


            if(i<user.projectsRef.length)
            {

                projects.push(<Divider key={"d"+ projectId}/>)
            }
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

        var hint=""
        if(this.state.contentLoaded)
            hint="Your projects"
        if(projects.length===0 && this.state.contentLoaded )
            hint="This account has no associated projects. Why don't you create a new one?"

        return (
          <div>
                <p style={{'textAlign':'center', 'color':'0#666666'}}></p> 

                <div>
                    <h4 style={{color:"grey"}}>{hint}</h4>

                    {projects}
            
                </div>          
          </div>
        )
    }
}

export default ProjectsList;