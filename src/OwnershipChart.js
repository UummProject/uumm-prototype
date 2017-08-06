import React from 'react'
import {Sunburst} from 'react-vis'
import Numeral from 'numeral'
import Chroma from 'chroma-js'

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

    getCenterContentStyle=()=>
    {
        return {
            "position":"absolute",
            "top":0,
            "left":0,
            "width":this.props.size,
            "height":this.props.size,
            "display":"flex",
            "flexDirection":"column",
            "justifyContent":"center",
            "alignItems":"center",
            "zIndex":-1
        }
        
    }

    buildData=(userTokens, restTokens, contributorsData)=>
    {
        //var userData= this.getData(userTokens, "#ff3366", "you")
        //var restData= this.getData(restTokens, "#aa3366", "rest")
        var data = {
            children:[]
        }

        var contributorsAmount = Object.keys(contributorsData).length
        var colors = Chroma.scale(['#fafa6e','#2A4858']).mode('lch').colors(contributorsAmount)
        var index = 0

        for (let address in contributorsData){
            if (contributorsData.hasOwnProperty(address))
            {
                let contributor = contributorsData[address]
                let d = this.getData(contributor.valueTokens, colors[index], address)
                data.children.push(d)
                index++
            }
        }
        return data
    }

    onValueMouseOver=(data)=>
    {
    }
    
    onValueMouseOut=(data)=>
    {
    }

    render()
    {
        var total = this.props.totalSupply-this.props.userTokens
        var data = this.buildData(this.props.userTokens, total, this.props.contributorsData)
        var color = "#ff3366"
        var userOwnership = Numeral(this.props.userTokens/this.props.totalSupply).format('0.0%')
        var shares = this.props.userTokens+"/"+this.props.totalSupply
        return (

            <div style={{"position":"relative"}}> 
               
                <div style={this.getCenterContentStyle()}>
                      <h2 style={{"color":color,"margin":2}}> {userOwnership}</h2>
                      <h4 style={{"color":"#aa3366","margin":2}}> {shares}</h4>                  
                </div> 

                <Sunburst
                    animation
                    hideRootNode
                    colorType="literal"
                    data={data}
                    height={this.props.size}
                    width={this.props.size}
                    onValueMouseOver={this.onValueMouseOver} 
                    onValueMouseOut={this.onValueMouseOut}/>    
            </div>

        )
    }
}

export default OwnershipChart