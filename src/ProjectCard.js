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

const titleStyle =
{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flexStart',
    flexGrow: 4
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
            <Paper style={containerStyle} zDepth={1} onTouchTap={this.onTouchTap}>
                <h4 style={titleStyle}> {this.props.data.name} </h4>       
            </Paper>
        );
    }
}

export default ProjectCard;