import React from 'react';

const containerStyle =
{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    height : 60,
    minWidth:600
}

const titleStyle =
{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flexStart',
    flexGrow: 4,
    fontWeight: 300
}
class UnconfirmedProjectCard extends React.Component {

    constructor(props)
    {
        super();
    }

    render()
    {
        return (
            <div style={containerStyle}  onTouchTap={this.onTouchTap}>
                <h4 style={titleStyle}> {this.props.data.name} </h4>  
                <p style={{"color":"#9E9E9E"}}> unconfirmed </p>       
            </div>
        );
    }
}

export default UnconfirmedProjectCard;