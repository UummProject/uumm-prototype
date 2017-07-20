import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import State from './State.js'
import Uumm from './UummContractInterface.js'
import ThumbsUpIcon from 'react-icons/lib/md/thumb-up'
import ThumbsDownIcon from 'react-icons/lib/md/thumb-down'

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

class ProposalCard extends React.Component {

    constructor(props)
    {
        super()
    }

    onPositiveVote =() =>
    {
        this.props.onPositiveVote(this.props.proposalData)
    }

    onNegativeVote =() =>
    {
        this.props.onNegativeVote(this.props.proposalData)
    }

    getAction =(state)=>
    {
        switch (state)
        {
            case State.ProposalState.PENDING:
                return (<div>
                        <RaisedButton icon={<ThumbsUpIcon/>} onTouchTap={this.onPositiveVote}/>
                        <RaisedButton icon={<ThumbsDownIcon/>} onTouchTap={this.onNegativeVote}/>
                    </div>)
            default :
                return (<div/>)
        } 
    }

    render()
    {  

        var actions = this.getAction(this.props.proposalData.state) 
        var positiveVotes = this.props.proposalData.positiveVotes / this.props.projectData.totalSupply*100
        var negativeVotes = this.props.proposalData.negativeVotes / this.props.projectData.totalSupply*100
    
        return (
            <Paper style={containerStyle} zDepth={1} >
                <h4> {this.props.proposalData.title} </h4> 
                {actions}
                <p> Tokens amount: {this.props.proposalData.valueAmount} </p> 
                <p> Positive: {positiveVotes} </p>
                <p> Negative: {negativeVotes} </p>
                <p> Author: {this.props.proposalData.author} </p>
            </Paper>
        )
    }
}

export default ProposalCard