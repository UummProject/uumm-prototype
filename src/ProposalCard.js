import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import State from './State'
import FontIcon from 'material-ui/FontIcon'
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

    onTouchTap =() =>
    {
        this.props.onTouchTap(this.props.data)
    }

    getAction =(state)=>
    {
        switch (state)
        {
            case State.ProposalState.PENDING:
                return (<div>
                        <RaisedButton icon={<ThumbsUpIcon />}/>
                        <RaisedButton icon={<ThumbsDownIcon />}/>
                    </div>)
            default :
                return (<div/>)
        } 
    }

    render()
    {  

    var actions = this.getAction(this.props.data.state) 

    
        return (
            <Paper style={containerStyle} zDepth={1} onTouchTap={this.onTouchTap}>
                <h4> {this.props.data.title} </h4> 
                <p> Proposal Id: {this.props.data.id} </p>       
                {actions}
                <p> Tokens amount: {this.props.data.valueAmount} </p> 
                <p> Author: {this.props.data.author} </p>
            </Paper>
        )
    }
}

export default ProposalCard