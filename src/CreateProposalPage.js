import React from 'react'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

class CreateProposalPage extends React.Component
{
    constructor(props)
    {
        super();
        this.state = {
            "proposalTitle" : "",
            "proposalReference" : "",
            "tokenAmount" : ""
        }
    }

    onCreate=()=>
    {
        this.props.onCreate(this.state.proposalTitle, this.state.proposalReference, this.state.tokenAmount)
    }   

    onCancel=()=>
    {
        this.props.onCancel()
    }  

    onProposalTitleTextChange = (e, newText) => {
        if(newText.length<32)
            this.setState({proposalTitle:newText})
    }

    onProposalReferenceTextChange = (e, newText) => {
            this.setState({proposalReference:newText})
    }

    onTokenAmountTextChange = (e, newText) => {
        if(isNaN(newText))
            return
        this.setState({tokenAmount:newText})
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
                title="New proposal"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.onCancel}>

                <TextField
                    autoFocus={true}
                    id="title"
                    hintText="Proposal title"
                    value={this.state.proposalTitle}
                    onChange={this.onProposalTitleTextChange}/>

                <br/>

                <TextField
                    autoFocus={true}
                    id="reference"
                    hintText="Reference link"
                    value={this.state.proposalReference}
                    onChange={this.onProposalReferenceTextChange}/>

                <br/>
                
                <TextField
                    autoFocus={true}
                    id="tokenAmount"
                    hintText="Token amount to recieve"
                    value={this.state.tokenAmount}
                    onChange={this.onTokenAmountTextChange}/>

            </Dialog>
        )
    }
}

export default CreateProposalPage;