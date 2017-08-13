import React from 'react'
import InProgressIcon from 'react-icons/lib/md/keyboard-control'

const cardStyle =
{
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding : 5,
    margin:5
}

const containerStyle =
{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:"100%"
}

const pStyle = 
{
    color:"#aaa"
}

const cellStyle = 
{
    flexGrow:1,
    textAlign:"center",
    flexShring:0
}

const stateCellStyle = 
{
    textAlign:"center",
    flexGrow:1,
    width:110,
    color:"#ccc"
}

const emptyCellStyle = 
{
    flexGrow:1,
    flexShring:1
}

class ProposalCard extends React.Component {

    constructor(props)
    {
        super()
    }

    render()
    {
        return (
            <div style={cardStyle} >
                <h3 style={{color:"#ccc", margin:7}}> {this.props.proposalData.title} </h3> 
                
                 <div style={containerStyle} >

                    <div style={cellStyle}/>
                    <div style={cellStyle}/>
                    <div style={cellStyle}> </div>
                    <div style={cellStyle}> </div>
                    <div style={cellStyle}><p style={pStyle}> ...unconfirmed </p></div>
                </div>
            </div>
        )
    }
}

export default ProposalCard