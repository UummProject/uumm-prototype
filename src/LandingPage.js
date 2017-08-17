import React from 'react'
import Divider from 'material-ui/Divider'
import ReactMarkdown from'react-markdown'
import text from './site.md'
import RaisedButton from 'material-ui/RaisedButton'


const whatIsThis=`
# Uummm

_Decentralized meritocracy_

## What is this


In recent years a new paradignm around decentralization has emerged.
Technologies such as Ethereum, IPFS or Bitcoin offer a whole new set of possibilities for re-designing most of the systems that drives our society.

**Uumm is a tool for the process of decision making**

For good decisions to be made the right incentives must be in place. One of the goals of this project is to create a tool that makes easy to create such ecosystem.

## How it works

The logic behind Uumm is ran by the Ethereum Network. Making the process extremely hard to censorship, transparent and accesible to anyone/anything.


## Where are we
We have a first working prototype. It covers a simple use-case where

**Contribution = Voting rights = Earnngs**

We are already working on a second iteration, and we would love to hear any input you may have.`

const imgUrl= 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Anatomical_engraving_of_a_horse._Wellcome_V0016883.jpg'

const introStyle={
    backgroundColor:'grey',
    height:window.innerHeight
}

const backgroundImageStyle={
    backgroundColor:'grey',
    height:window.innerHeight,
    minWidth: '100%',
    backgroundImage:'url('+imgUrl+')',
    backgroundRepeat:'no-repeat',
    backgroundSize:'cover',
    backgroundPosition:'center',
}

class LandingPage extends React.Component {

    constructor(props)
    {
        super()
    }

    render()
    {
        return (
            <div>
                <div style = {backgroundImageStyle}>
                  <div style={{color:'white', display:"flex", justifyContent:"center", alignItems:"center", height:'100%', flexDirection: 'column' }}>
                        <h1 style={{color:'white'}}>
                            UUMM
                        </h1>
                        <h3>
                            Decentralized meritocracy
                        </h3>

                        <RaisedButton
                            secondary={false}
                            fullWidth={false}
                            label="Create a project"
                            onTouchTap={this.props.createProject}/> 

                    </div>
                </div>
                    <div style={{ display:"flex", justifyContent:"center", alignItems:"flexStart" }}>
                        <div className="markdown"  style={{margin:20, maxWidth:600, minWidth:400}}>            
                            <ReactMarkdown source={whatIsThis}/>
                        </div>
                    </div>
           </div>
        )
    }
}

export default LandingPage