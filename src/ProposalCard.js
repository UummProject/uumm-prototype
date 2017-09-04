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

const bodyRowStyle =
{
    padding:20,
    display: 'flex',
    flexDirection: 'row',
    //flexWrap: 'nowrap',
    justifyContent: 'space-between',
   // alignItems: 'left',
    width:"100%"
}

const bodyColumnStyle=
{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'left',
}

const headerContainerStyle =
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
    margin:5
}

const iconStyle =
{
    color:"#aaa",
    width:50
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
       this.setState({extended:!this.state.extended})
    }

    getUserState =(state, hasConcensus, isOwner, vote)=>
    {
        console.log("vote",)
        
            if(vote === 0 || (isOwner && vote == undefined))
            {
                return (<div>
                    <p style={pStyle}> Vote </p>
                    <RaisedButton style={{minWidth:50, width:50}} icon={<ApproveIcon/>} onTouchTap={this.onPositiveVote}/>
                    <RaisedButton style={{minWidth:50, width:50}} icon={<DenniedIcon/>} onTouchTap={this.onNegativeVote}/>
                </div>)
            }

            else if(vote == undefined && isOwner)
            {
                 return (<div>
                    <p style={pStyle}> Vote </p>
                    <RaisedButton style={{minWidth:50, width:50}} icon={<ApproveIcon/>} onTouchTap={this.onPositiveVote}/>
                    <RaisedButton style={{minWidth:50, width:50}} icon={<DenniedIcon/>} onTouchTap={this.onNegativeVote}/>
                </div>)
            }

            let voted = <div/>
            let resolve = <div/>
            let note = <div/>

            if (vote > 0)
            {
                voted = (<div>
                            <p style={pStyle}> Voted {Math.abs(vote)} </p>
                            <ApproveIcon  size={25}/>
                    </div>)
            }
            else if (vote < 0)
            {
                voted = <div>
                            <p style={pStyle}> Voted {Math.abs(vote)} </p>
                            <DenniedIcon  size={25}/>
                    </div>
            } 
                    
        switch (state)
        { 
            case State.ProposalState.PENDING:
                if(hasConcensus)
                    resolve = (<RaisedButton label={"Resolve"} onTouchTap={this.onResolve}/>)
                else
                    resolve = <p style={pStyle}> Waiting others </p>
                    
                break

            case State.ProposalState.IN_PROGRESS:
                note = <div>
                            <p style={pStyle}> unconfirmed </p>
                            <InProgressIcon size={30}/>
                         </div>
                    break
        } 

        return (<div style = {{width:100}}>
                    {note}
                    {voted}
                    {resolve}
                </div>)
    }

    getStateIcon =(state, hasConcensus, isOwner)=>
    {
        switch (state)
        {
            case State.ProposalState.APPROVED: return (<div style = {iconStyle}> <ApproveIcon size={20}/> </div>)
            case State.ProposalState.DENIED: return (<div style = {iconStyle}> <DenniedIcon size={20}/> </div>)
            case State.ProposalState.EXPIRED: return (<div style = {iconStyle}> <p> Expired</p> </div>)
            case State.ProposalState.PENDING: return (<div style = {iconStyle}> <InProgressIcon size={20}/> </div>)
                              
            default :
                return (<div/>)
        } 
    }

    getStateString =(state, hasConcensus, isOwner)=>
    {
        switch (state)
        {
            case State.ProposalState.APPROVED: return (<p style={pStyle}> Approved </p>)
            case State.ProposalState.DENIED: return (<p style={pStyle}> Denied </p>)
            case State.ProposalState.EXPIRED: return (<p style={pStyle}> Expired </p>)
            case State.ProposalState.PENDING: return (<p style={pStyle}> Open </p>)
                              
            default :
                return (<div/>)
        } 
    }

    render()
    {  
        //TODO: Most of this data should come from props

        //State data
        let totalSupply = this.props.projectData.totalSupply
        if(this.props.proposalData.state !== State.ProposalState.PENDING)
            totalSupply = this.props.proposalData.totalSupply

        let positivePercentage = this.props.proposalData.positiveVotes / totalSupply
        let negativePercentage = this.props.proposalData.negativeVotes / totalSupply
        //let participation = positivePercentage + negativePercentage
        let hasConcensus = (positivePercentage > this.props.projectData.requiredConcensus) || (negativePercentage > this.props.projectData.requiredConcensus)
        //let hasEnoughParticipation =  participation > this.props.projectData.requiredParticipation


        //User data
        let contributorData = State.getContributorData(this.props.projectId, this.props.userAddress)
        let contributorVote = State.getContributorVote(this.props.projectId, this.props.proposalData.id, this.props.userAddress)
        let userState = this.getUserState(this.props.proposalData.state, hasConcensus, isOwner, contributorVote) 
            



        let isOwner = false
        if(contributorData)
            isOwner = contributorData.valueTokens > 0

        
        let stateIcon = this.getStateIcon(this.props.proposalData.state, hasConcensus, isOwner) 
        let stateString = this.getStateString(this.props.proposalData.state, hasConcensus, isOwner) 

        let header = (<div style = {headerContainerStyle} onClick={this.onTitleClicked} >
                        
                        <h3 style={{margin:5}}> {this.props.proposalData.title} </h3> 
                        {stateIcon}
                    </div>)

        let body = <div/>

        if (this.state.extended)
            body =(<div style={{width: '100%'}}>
                        <div style={bodyRowStyle}>
                            <div style={bodyColumnStyle}>
                                <p style={pStyle}> Proposal state: </p>
                                {stateString}
                                <div ><p style={pStyle}> <ApproveIcon/> {Numeral(positivePercentage).format('0.0%')}, {this.props.proposalData.positiveVotes} votes</p></div>
                                <div ><p style={pStyle}> <DenniedIcon/> {Numeral(negativePercentage).format('0.0%')}, {this.props.proposalData.negativeVotes} votes</p></div>
                            </div>
                            <div style={bodyColumnStyle}>
                                <div style={stateCellStyle}> {userState} </div>
                            </div>
                        </div>

                        <div style={bodyRowStyle}>
                            <div style={bodyColumnStyle}>
                                <p style={pStyle}> Tokens asked: {this.props.proposalData.valueAmount} </p>
                                <p style={pStyle}> Description: [Sorry, we're working on that] </p>
                            </div>
                        </div>

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