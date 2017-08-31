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
    paddingTop:15,
    paddingBottom:20,
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
    color:"#aaa",
    margin:5
}

const cellStyle = 
{
    flexGrow:1,
    textAlign:"center",
    flexShring:0
}

const stateCellStyle = 
{
    textAlign:"center",
    flexGrow:1,
    width:110
}

const emptyCellStyle = 
{
    flexGrow:1,
    flexShring:1
}

class ProposalCard extends React.Component {

    constructor(props)
    {
        super()
        this.state = {extended:false}
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

    onTitleClicked =() =>
    {
        console.log("click")
       this.setState({extended:!this.state.extended})
    }

    getAction =(state, hasConcensus, isOwner)=>
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
                    if(!isOwner)
                        return (<p> </p>)

                    return (<div>
                            <RaisedButton style={{minWidth:50, width:50}} icon={<ApproveIcon/>} onTouchTap={this.onPositiveVote}/>
                            <RaisedButton style={{minWidth:50, width:50}} icon={<DenniedIcon/>} onTouchTap={this.onNegativeVote}/>
                        </div>)
                }
            case State.ProposalState.APPROVED: return (<ApproveIcon size={25}/>)
            case State.ProposalState.DENIED: return (<DenniedIcon size={25}/>)
            case State.ProposalState.EXPIRED: return (<p> Expired</p>)
            case State.ProposalState.IN_PROGRESS: return (<InProgressIcon size={30}/>)
                              
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

        var header = (<div onClick={this.onTitleClicked} >
                        <h3 style={{margin:5}}> {this.props.proposalData.title} </h3> 
                    </div>)

        var body = <div/>

        if (this.state.extended)
            body =(                       
                         <div style={containerStyle}>

                            <div style={stateCellStyle}> {actions} </div>
                            <div style={emptyCellStyle}/>
                            <div style={cellStyle}><p style={pStyle}> Tokens asked: {this.props.proposalData.valueAmount} </p> </div>
                            <div style={cellStyle}><p style={pStyle}> <ApproveIcon/> {Numeral(positiveVotes).format('0.0%')} </p></div>
                            <div style={cellStyle}><p style={pStyle}> <DenniedIcon/> {Numeral(negativeVotes).format('0.0%')} </p></div>
                    </div>)

        return (
            <div style={cardStyle}>
               {header}
               {body}
            </div>
        )
    }
}

export default ProposalCard