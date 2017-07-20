import React from 'react';
import ProposalCard from './ProposalCard';
import Uumm from './UummContractInterface.js'
import State from './State.js'

class ProposalsList extends React.Component
{
    constructor(props)
    {
        super();
        this.state = {};
        Uumm.isReady().then(()=>{
            Uumm.getProposals(props.projectId)
        })
    }

    onPositiveVote = (proposalData)=>
    {
         Uumm.voteProposal(this.props.projectId, proposalData.id, true)
    }
    
    onNegativeVote = (proposalData)=>
    {
        Uumm.voteProposal(this.props.projectId, proposalData.id, false)
    }

    onResolve = (proposalData)=>
    {
        Uumm.resolveProposal(this.props.projectId, proposalData.id)
    }
  
    render()
    {
        var projectData = State.getEmptyProject()
        
        if(State.data.projects[this.props.projectId])
        {
            projectData = State.data.projects[this.props.projectId]
        }


        var proposals = [];
        if(projectData.proposals)
        {
            for (var i = 0; i<projectData.proposals.length; i++) 
            {
                var proposalData = State.getEmptyProposal()

                if(projectData.proposals[i])
                    proposalData = projectData.proposals[i] 

                proposals.push(
                    <ProposalCard
                        key={i}
                        projectId={this.props.projectId}
                        proposalData={proposalData}
                        projectData={projectData}
                        onPositiveVote={this.onPositiveVote}
                        onNegativeVote={this.onNegativeVote}
                        onResolve={this.onResolve}
                    />);
            }
        }

        return (
          <div>
                {proposals}    
          </div>
        );
    }
}

export default ProposalsList;