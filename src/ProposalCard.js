import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import State from './State.js'
import ApproveIcon from 'react-icons/lib/fa/check'
import DenniedIcon from 'react-icons/lib/fa/close'
import InProgressIcon from 'react-icons/lib/md/keyboard-control'
import Numeral from 'numeral'

const cardStyle =
{
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding : 5,
    margin:5
}

const containerStyle =
{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:"100%"
}

const pStyle = 
{
    color:"#aaa"
}

const cellStyle = 
{
    flexGrow:1,
    textAlign:"center"
}

const stateCellStyle = 
{
    flexGrow:2,
    textAlign:"center"
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

    getAction =(state, hasConcensus, isOwner)=>
    {
        console.log(state)
        switch (state)
        {
            case State.ProposalState.PENDING:
                if(hasConcensus)
                {
                    return (<RaisedButton label={"Resolve"} onTouchTap={this.onResolve}/>)
                }
                else
                {
                    if(!isOwner)
                        return (<p> </p>)

                    return (<div>
                            <RaisedButton icon={<ApproveIcon/>} onTouchTap={this.onPositiveVote}/>
                            <RaisedButton icon={<DenniedIcon/>} onTouchTap={this.onNegativeVote}/>
                        </div>)
                }
            case State.ProposalState.APPROVED: return (<ApproveIcon size={25}/>)
            case State.ProposalState.DENIED: return (<DenniedIcon size={25}/>)
            case State.ProposalState.EXPIRED: return (<p> Expired</p>)
            case State.ProposalState.IN_PROGRESS: return (<InProgressIcon size={25}/>)
                              
            default :
                return (<div/>)
        } 
    }

    render()
    {  
        //TODO: Most of this data should come from props
        var contributorData = State.getContributorData(this.props.projectId, this.props.userAddress)
        var isOwner = false
        if(contributorData)
            isOwner = contributorData.valueTokens > 0

        var totalSupply = this.props.projectData.totalSupply
        if(this.props.proposalData.state !== State.ProposalState.PENDING)
            totalSupply = this.props.proposalData.totalSupply

        var positiveVotes = this.props.proposalData.positiveVotes / totalSupply
        var negativeVotes = this.props.proposalData.negativeVotes / totalSupply
        //var participation = positiveVotes + negativeVotes
        var hasConcensus = (positiveVotes > this.props.projectData.requiredConcensus) || (negativeVotes > this.props.projectData.requiredConcensus)
        //var hasEnoughParticipation =  participation > this.props.projectData.requiredParticipation

        var actions = this.getAction(this.props.proposalData.state, hasConcensus, isOwner) 

        return (
            <div style={cardStyle} >
                <h3 style={{margin:5}}> {this.props.proposalData.title} </h3> 
                
                 <div style={containerStyle} >

                    <div style={stateCellStyle}> {actions} </div>
                    <div style={cellStyle}><p style={pStyle}> Tokens asked: {this.props.proposalData.valueAmount} </p> </div>
                    <div style={cellStyle}><p style={pStyle}> <ApproveIcon/> {Numeral(positiveVotes).format('0.0%')} </p></div>
                    <div style={cellStyle}><p style={pStyle}> <DenniedIcon/> {Numeral(negativeVotes).format('0.0%')} </p></div>
                </div>
            </div>
        )
    }
}

export default ProposalCard