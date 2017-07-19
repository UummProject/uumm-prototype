import React from 'react';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import State from './State.js'
import Uumm from './UummContractInterface.js'
import RaisedButton from 'material-ui/RaisedButton'
import CreateProposalPage from './CreateProposalPage.js'

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

        this.state = {"newProposalDialogIsOpen" : false};

        Uumm.isReady().then(()=>{
            Uumm.getProjectDetails(props.projectId)
            Uumm.getUserContributorData(props.projectId, Uumm.userAddress)
            Uumm.getProposals(props.projectId)
        })

        window.location.hash = "projectId="+props.projectId
    }

    onMakeNewProposal=()=>
    {
         this.setState({'newProposalDialogIsOpen':true})
    }

    onProposalSubmited=(title, reference, tokenAmount)=>
    {
        this.setState({'newProposalDialogIsOpen':false})
        Uumm.createProposal(this.props.projectId, title, reference, tokenAmount)
    }

    closeDialog = ()=>
    {
        this.setState({'newProposalDialogIsOpen':false})
    }

    render()
    {
        var projectData = State.getEmptyProject()
        var contributorData = State.getEmptyContributor()
    
        if(State.data.projects[this.props.projectId])
            projectData = State.data.projects[this.props.projectId]

        if(projectData.contributors)
               if(projectData.contributors[Uumm.userAddress])
                    contributorData = projectData.contributors[Uumm.userAddress]

        console.log(projectData)
        if(projectData.proposals)
        {
            for (var i = 0; i<projectData.proposals.length; i++) 
            {
                console.log(i, projectData.proposals[i])
            }
        }
          
        return (
            <div >
                <Avatar
                    color={deepOrange300}
                    backgroundColor={purple500}
                    size={30}
                    style={style}>
                    {projectData.name[0]}
                </Avatar>

                <h4 style={titleStyle}> {projectData.name} </h4> 
                <p> Project Id: {projectData.id} </p>       
                <p> ContributorId: {contributorData.id} </p>
                <p> Tokens amount: {contributorData.valueTokens} </p> 
                <p> Ether amount: {contributorData.ethereumBalance} </p>
                <p> Ownership: {projectData.totalSupply/contributorData.valueTokens*100}% </p> 

                 <RaisedButton
                    secondary={true}
                    fullWidth={false}
                    label="Make new proposal"
                    onTouchTap={this.onMakeNewProposal} /> 
                <CreateProposalPage
                    open={this.state.newProposalDialogIsOpen}
                    onCancel={this.closeDialog}
                    onCreate={this.onProposalSubmited}/>
            </div>
        );
    }
}

export default ProjectDetails;