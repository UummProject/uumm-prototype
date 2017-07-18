import React from 'react';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import State from './State.js'
import Uumm from './UummContractInterface.js'

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

const containerStyle =
{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    height : 80,
    padding : 15,
    marginTop : 10,
    margnBottom : 30,
    marginLeft:5,
    marginRight:5
}

const titleStyle =
{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flexStart',
    flexGrow: 4
}

const style = {margin: 5};

class ProjectDetails extends React.Component {

    constructor(props)
    {
        super();
    }

    componentWillMount=()=>
    {
        /*var that = this
        Uumm.isReady()
        .then(function(){
            Uumm.getUserProjects()
            .then(function(projects){
                that.setState({'projects':projects})
            }).catch(function(error){console.log(error)})
        }).catch(function(error){console.log(error)}) 
        */

        Uumm.isReady()
        .then(Uumm.getProjectDetails(this.props.projectId))
    }

    render()
    {
        var projectDetails = State.data.projects[this.props.projectId]
        console.log(this.props.projectId)

        return (
            <div >
                <Avatar
                    color={deepOrange300}
                    backgroundColor={purple500}
                    size={30}
                    style={style}>
                    {projectDetails.name[0]}
                </Avatar>
                    <h4 style={titleStyle}> {projectDetails.name} </h4> 
                    <p style={titleStyle}> {projectDetails.id} </p>       
            </div>
        );
    }
}

export default ProjectDetails;