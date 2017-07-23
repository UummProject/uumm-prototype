import React from 'react'
import Paper from 'material-ui/Paper'

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

class UnconfimedProposalCard extends React.Component {

    constructor(props)
    {
        super()
    }

    render()
    {  
        return (
            <Paper style={containerStyle} zDepth={1} >
                <h4 style={{"color":"#9E9E9E"}}> {this.props.proposalData.title} </h4> 
                <p style={{"color":"#9E9E9E"}}> unconfirmed </p>
            </Paper>
        )
    }
}

export default UnconfimedProposalCard