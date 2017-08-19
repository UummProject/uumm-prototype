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

const imgUrl= process.env.PUBLIC_URL + '/img/horseAnatomy.jpg'

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

const titleStyle ={
   color: '#666666',
   fontSize: '3em',
   margin:0
}

const subtitleStyle = {
    color: '#666666'
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
                  <div style={{color:'white', display:'flex', justifyContent:'center', alignItems:'center', height:'100%', flexDirection: 'column' }}>
                        <h1 style={titleStyle}>
                            uumm
                        </h1>
                        <p style={subtitleStyle}>
                            decentralized meritocracy
                        </p>
                        <br/>
                        <RaisedButton
                            secondary={true}
                            fullWidth={false}
                            label='Create a project'
                            onTouchTap={this.props.createProject}/> 

                    </div>
                </div>
                    <div style={{ display:'flex', justifyContent:'center', alignItems:'flexStart', 'backgroundColor':'#333333' }}>
                        <div className='markdown'  style={{margin:20, marginBottom:50, maxWidth:600, minWidth:400, color:'#cccccc'}}>            
                            <ReactMarkdown source={whatIsThis}/>
                        </div>
                    </div>
           </div>
        )
    }
}

export default LandingPage