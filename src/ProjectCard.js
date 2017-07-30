import React from 'react';

const containerStyle =
{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    height : 50,
    padding : 10,

    marginLeft:5,
    marginRight:5
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

class ProjectCard extends React.Component {

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
            <div style={containerStyle} onTouchTap={this.onTouchTap}>
                <h3 style={titleStyle}> {this.props.data.name} </h3>       
            </div>
        );
    }
}

export default ProjectCard;