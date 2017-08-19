import React, { Component } from 'react'
import Warning from './Warning.js'
import RaisedButton from 'material-ui/RaisedButton'

const FloatingButtonStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    zIndex:100
};

const FloatingButtonStyle2 = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 60,
    left: 'auto',
    position: 'fixed',
    zIndex:100
};

const twitterLink = 'http://twitter.com/home?status=@xavivives About the Uummm tool...'
const issueLink = 'https://github.com/xavivives/uumm/issues/new'

class Page extends Component
{
    render(){

        return (
            <div>
                <div style={{ display:"flex", justifyContent:"center", alignItems:"flexStart" }}>                     
                    <div style={{margin:20, maxWidth:600, minWidth:400}}> 
                    
                        <Warning>           
                             <p>This tool is highly experiemental and on an alpha stage still. Don't use it for important stuff</p>        
                         </Warning>
                         
                         {this.props.children}

                         <RaisedButton
                            style = {FloatingButtonStyle2}
                            href = {twitterLink}
                            secondary={false}
                            disabled={false}
                            label ='Feedback?'
                            />

                            <RaisedButton
                            style = {FloatingButtonStyle}
                            href = {issueLink}
                            onTouchTap={this.onProblemClicked}
                            secondary={false}
                            disabled={false}
                            label ='Problems?'
                            />

                     </div>                             
                </div>
            </div>
        )
    }
}

export default Page
