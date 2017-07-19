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

    onProposalSelected = (proposalData)=>
    {
        //this.props.onProposalSelected(proposalData)
    }
  
    render()
    {
        var project = State.getEmptyProject()
        
        if(State.data.projects[this.props.projectId])
        {
            project = State.data.projects[this.props.projectId]
        }


        var proposals = [];
        if(project.proposals)
        {
            for (var i = 0; i<project.proposals.length; i++) 
            {
                var proposal = State.getEmptyProposal()

                if(project.proposals[i])
                    proposal = project.proposals[i] 

                proposals.push(
                    <ProposalCard
                        key={i}
                        data={proposal}
                        onTouchTap={this.onProposalSelected}
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