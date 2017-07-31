import React from 'react'
import State from './State.js'
import Web3AutoSetup from './Web3AutoSetup.js'
import OwnershipChart from './OwnershipChart.js'
import Numeral from 'numeral'
import MarkdownLoader from './MarkdownLoader.js'

class ProjectDetails extends React.Component {

    constructor(props)
    {
        super()
    }

    render()
    {
        var projectData = State.getEmptyProject()
        var contributorData = State.getEmptyContributor()
    
        if(State.data.projects[this.props.projectId])
            projectData = State.data.projects[this.props.projectId]

        if(projectData.contributors)
               if(projectData.contributors[Web3AutoSetup.currentAccount])
                    contributorData = projectData.contributors[Web3AutoSetup.currentAccount]

        var ownership = Numeral(contributorData.valueTokens/projectData.totalSupply).format('0.0%')

        var notOwnerHint = "Your account doesn't own any shares of this project, therefore you can't vote or resolve proposals. You can still make proposals though"

        var hint = ""
        if(contributorData.valueTokens===0)
            hint = notOwnerHint

        return (
           <div>    
               <p> Project Id: {projectData.id} </p>       
               <p> ContributorId: {contributorData.id} </p>
               <p> Tokens amount: {contributorData.valueTokens}/{projectData.totalSupply} </p> 
               <p> Ether amount: {contributorData.ethereumBalance} </p>
               <p> Ownership: {ownership} </p> 
               <p> {hint} </p>
               <OwnershipChart userTokens={contributorData.valueTokens} totalSupply={projectData.totalSupply} />

               <MarkdownLoader url="https://raw.githubusercontent.com/xavivives/Uumm/master/README.md"/>
           </div>
        )
    }
}

export default ProjectDetails