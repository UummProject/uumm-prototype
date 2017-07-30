import React from 'react'
import {Sunburst} from 'react-vis';

const size = 200

const centerContentStyle=
{
    "position":"absolute",
    "top":0,
    "left":0,
    "width":size,
    "height":size,
    "display":"flex",
    "flexDirection":"column",
    "justifyContent":"center",
    "alignItems":"center",
    "zIndex":-1
}

class OwnershipChart extends React.Component {

    constructor(props)
    {
        super()

        this.state = {}
    }

    getData=(size= 0 ,color = "#0000000",title="Not defined", children=[])=>
    {
        return {
            title:title,
            color:color,
            size:size,
            children:children
        }
    }

    buildData=(userTokens, restTokens)=>
    {
        var userData= this.getData(userTokens, "#ff3366", "you")
        var restData= this.getData(restTokens, "#aa3366", "rest")
        var data = {
            children:[userData, restData]
        }
        return data
    }

    onValueMouseOver=(data)=>
    {
        var overTitle = ""
        var overSize = ""
        var overColor = "#0"
        if(data.title)
            overTitle=data.title
        if(data.size)
            overSize=data.size
        if(data.color)
            overColor=data.color

        this.setState({
            overSize:overSize, 
            overTitle:overTitle,
            overColor:overColor
        })
    }
    onValueMouseOut=(data)=>
    {
        this.setState({overSize:"", overTitle:this.props.userTokens+"/"+this.props.totalSupply})
    }

    render()
    {
        var data = this.buildData(this.props.userTokens, this.props.totalSupply-this.props.userTokens)
        var size = 200
        var color = this.state.overColor
        console.log(this.state)
        return (
            <div style={{"position":"relative"}}> 
               
                <div style={centerContentStyle}>
                      <h2 style={{"color":color,"margin":2}}> {this.state.overSize}</h2>
                      <h3 style={{"color":color,"margin":2}}> {this.state.overTitle}</h3>
                </div> 

                <Sunburst
                  hideRootNode
                  colorType="literal"
                  data={data}
                  height={size}
                  width={size}
                  onValueMouseOver={this.onValueMouseOver} 
                  onValueMouseOut={this.onValueMouseOut}/> 

                          
            </div>

        )
    }
}

export default OwnershipChart