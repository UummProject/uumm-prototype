import React from 'react';
import Paper from 'material-ui/Paper';

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
        super();
    }

    onTouchTap =() =>
    {
        this.props.onTouchTap(this.props.data)
    }

    render()
    {         
        return (
            <Paper style={containerStyle} zDepth={1} onTouchTap={this.onTouchTap}>
                <h4> {this.props.data.title} </h4> 
                <p> Proposal Id: {this.props.data.id} </p>       
                <p> Reference: {this.props.data.reference} </p>
                <p> Tokens amount: {this.props.data.valueAmount} </p> 
                <p> Author: {this.props.data.author} </p>
                <p> Creation date: {this.props.data.creationDate.toString()}</p>        
            </Paper>
        );
    }
}

export default ProposalCard;