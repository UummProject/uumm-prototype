import React from 'react'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

class CreateProjectPage extends React.Component {


    constructor(props)
    {
        super();
        this.state = {"projectName" : ""}
    }

    onCreate=()=>
    {
        this.props.onCreate(this.state.projectName)
    }   

    onCancel=()=>
    {
        this.props.onCancel()
    }  

    onTextChange = (e, newText) => {
        if(newText.length<32)
            this.setState({projectName:newText})
    }

    render()
    {
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={this.onCancel}
            />,
            <FlatButton
              label="Create"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.onCreate}
            />
        ]

        return (
            <Dialog
                title="How will you call your project?"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.onCancel}>

                <TextField
                    autoFocus={true}
                    id="inputText"
                    hintText="Project name"
                    value={this.state.projectName}
                    onChange={this.onTextChange}/>
                   
            </Dialog>
        )
    }
}

export default CreateProjectPage;