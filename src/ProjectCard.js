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
            <Paper style={containerStyle} zDepth={0} onTouchTap={this.onTouchTap}>
                <h3 style={titleStyle}> {this.props.data.name} </h3>       
            </Paper>
        );
    }
}

export default ProjectCard;