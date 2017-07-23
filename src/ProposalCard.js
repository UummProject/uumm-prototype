import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import State from './State.js'
import Uumm from './UummContractInterface.js'
import ThumbsUpIcon from 'react-icons/lib/md/thumb-up'
import ThumbsDownIcon from 'react-icons/lib/md/thumb-down'
import Numeral from 'numeral'

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

    onResolve =() =>
    {
        this.props.onResolve(this.props.proposalData)
    }

    getAction =(state, hasConcensus)=>
    {
        switch (state)
        {
            case State.ProposalState.PENDING:
                if(hasConcensus)
                {
                    return (<RaisedButton label={"Resolve"} onTouchTap={this.onResolve}/>)
                }
                else
                {
                    return (<div>
                            <RaisedButton icon={<ThumbsUpIcon/>} onTouchTap={this.onPositiveVote}/>
                            <RaisedButton icon={<ThumbsDownIcon/>} onTouchTap={this.onNegativeVote}/>
                        </div>)
                }
            case State.ProposalState.APPROVED: return (<p> Approved</p>)
            case State.ProposalState.DENIED: return (<p> Denied</p>)
            case State.ProposalState.EXPIRED: return (<p> Expired</p>)
                
               
            default :
                return (<div/>)
        } 
    }

    render()
    {  
        var totalSupply = this.props.projectData.totalSupply
        if(this.props.proposalData.state != State.ProposalState.PENDING)
            totalSupply = this.props.proposalData.totalSupply

        var positiveVotes = this.props.proposalData.positiveVotes / totalSupply
        var negativeVotes = this.props.proposalData.negativeVotes / totalSupply
        var participation = positiveVotes + negativeVotes
        var hasConcensus = (positiveVotes > this.props.projectData.requiredConcensus) || (negativeVotes > this.props.projectData.requiredConcensus)
        var hasEnoughParticipation =  participation > this.props.projectData.requiredParticipation

        var actions = this.getAction(this.props.proposalData.state, hasConcensus) 

        return (
            <Paper style={containerStyle} zDepth={1} >
                <h4> {this.props.proposalData.title} </h4> 
                {actions}
                <p> Tokens amount: {this.props.proposalData.valueAmount} </p> 
                <p> Positive: {Numeral(positiveVotes).format('0.0%')} </p>
                <p> Negative:{Numeral(negativeVotes).format('0.0%')} </p>
                
            </Paper>
        )
    }
}

export default ProposalCard