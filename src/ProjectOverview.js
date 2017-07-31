import React from 'react'
import State from './State.js'
import Web3AutoSetup from './Web3AutoSetup.js'
import OwnershipChart from './OwnershipChart.js'
import Numeral from 'numeral'
import MarkdownLoader from './MarkdownLoader.js'
import Divider from 'material-ui/Divider';

class ProjectDetails extends React.Component {

    constructor(props)
    {
        super()
        var address = process.env.PUBLIC_URL
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

        var userContent = {}
        if(contributorData.valueTokens!==0)
        {
            userContent= <div>          
               <OwnershipChart userTokens={contributorData.valueTokens} totalSupply={projectData.totalSupply} />
           </div>
        }
        else
        {
             userContent= <div> 
                <p style={{color:"red"}}>
                    Your account doesn't own any shares of this project, therefore you can't vote or resolve proposals.
                </p>
                <p style={{color:"red"}}>
                    You can still make proposals though.
                </p>
            </div>
        }
            
        
        return (
           <div>    
                <a href ={"http://localhost:3000/#projectId="+projectData.id}> Project Id: {projectData.id} </a>
                <Divider/>      
                {userContent}
                <Divider/>
                <MarkdownLoader url="https://raw.githubusercontent.com/xavivives/Uumm/master/README.md"/>
           </div>
        )
    }
}

export default ProjectDetails