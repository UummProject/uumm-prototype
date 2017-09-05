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
    paddingLeft:5,
    paddingRight:5
}

const bodyRowStyle =
{
    //padding:10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'100%'
}

const bodyColumnStyle=
{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'left',
    flex:1,
    flexGrow:2,
    padding:10
}

const shrinkColumnStyle=
{
    flexShrink:0,
    flex:1,
}

const headerContainerStyle =
{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:'100%'
}

const pStyle = 
{
    margin:5,
}

const labelStyle = 
{
    margin:5,
    color:'#aaa',
    fontStyle: 'normal'
}

const labelContentStyle = 
{
    margin:5,
    color:'#333',
    display: 'inline-block'
}

const iconStyle =
{
    color:'#aaa',
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
        if(!isOwner)
            return <div/>
        
        if(!vote && state===State.ProposalState.PENDING)
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
                        <p style={pStyle}> Voted ({Math.abs(vote)}) </p>
                        <ApproveIcon  size={25}/>
                </div>)
        }
        else if (vote < 0)
        {
            voted = <div>
                        <p style={pStyle}> Voted ({Math.abs(vote)}) </p>
                        <DenniedIcon  size={25}/>
                </div>
        } 
                   
        switch (state)
        { 
            case State.ProposalState.PENDING:
                if(hasConcensus)
                    resolve = (<RaisedButton label={'Resolve'} onTouchTap={this.onResolve}/>)
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

    getMainAction =(state, hasConcensus, isOwner, vote)=>
    {       
        if(!isOwner)
            return <div/>
        
        if(state===State.ProposalState.PENDING)
        {
            if(!vote)
                return  <div style = {{width:70}} ><div style={labelStyle}> Vote </div> </div>
            
            else if(hasConcensus)
                return  <div style = {{width:70}} ><div style={labelStyle}> Resolve </div> </div>
            
            else
                return  <div style = {{width:70}} ><div style={labelStyle}> Waiting </div> </div>
        }
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
            case State.ProposalState.IN_PROGRESS: return (<p style={pStyle}> Waiting... </p>)
                              
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
        
        let isOwner = false
        if(contributorData)
            isOwner = contributorData.valueTokens > 0

        let userState = this.getUserState(this.props.proposalData.state, hasConcensus, isOwner, contributorVote) 
            
        let stateIcon = this.getStateIcon(this.props.proposalData.state, hasConcensus, isOwner) 
        let stateString = this.getStateString(this.props.proposalData.state, hasConcensus, isOwner) 
        let mainAction = this.getMainAction(this.props.proposalData.state, hasConcensus, isOwner, contributorVote) 

        let header = (
            <div style = {headerContainerStyle} onClick={this.onTitleClicked} >
                <h3 style={{margin:3}}> {this.props.proposalData.title} </h3> 
                <div style={shrinkColumnStyle}/>
                {mainAction}
                {stateIcon}
            </div>)

        let body = <div/>

        if (this.state.extended)
            body =( <div style = {{width:'100%'}}>
                        <div style={bodyRowStyle}>
                            <div style={bodyColumnStyle}>
                                <p style={labelStyle}> Proposal state: {stateString}</p>
                                <div ><p style={pStyle}> <ApproveIcon/> {Numeral(positivePercentage).format('0.0%')}, {this.props.proposalData.positiveVotes} votes</p></div>
                                <div ><p style={pStyle}> <DenniedIcon/> {Numeral(negativePercentage).format('0.0%')}, {this.props.proposalData.negativeVotes} votes</p></div>
                            </div>

                           <div style={shrinkColumnStyle}/>

                            <div style={bodyColumnStyle}>
                                {userState}
                            </div>
                        </div>

                        <div style={bodyRowStyle}>
                            <div style={bodyColumnStyle}>
                                <p style={pStyle}>
                                    <em style={labelStyle}> Tokens asked: </em>
                                    {this.props.proposalData.valueAmount}
                                </p> 

                                <p style={labelStyle}> Description: [Sorry, we're working on that] </p>
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