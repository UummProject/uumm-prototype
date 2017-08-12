import React from 'react'
import {Sunburst} from 'react-vis'
import Numeral from 'numeral'
import Chroma from 'chroma-js'

class OwnershipChart extends React.Component {

    constructor(props)
    {
        super()
        this.state = {}
        window.setTimeout(this.showGraph,3000)
    }

    getData=(size= 0 ,color = "#e0d9cc" ,title="Not defined", children=[])=>
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

    buildEmptyData=()=>
    {
        let data = {
            children:[this.getData(1),this.getData(0)]
        }
        console.log(data)
        return data
    }

    buildData=(total, contributorsData, userAddress)=>
    {
        let data = {
            children:[]
        }

        let sum = 0
        let array = []
        for (var address in  contributorsData)
        {
            if (contributorsData.hasOwnProperty(address))
            {
                array.push(contributorsData[address])
            }
        }

        let colors = Chroma.scale(['#ff3366','#FBFF12']).mode('lch').colors(array.length+1)
        array.sort(this.sortById)
        let index = 0

        for (let contributor of array)
        {
            let color = Chroma(colors[index]).desaturate(5).hex()
            if(contributor.contributorAddress === userAddress)
                color= Chroma(colors[index]).hex()

            let d = this.getData(contributor.valueTokens, color , contributor.address)
            
            data.children.push(d)
            sum += contributor.valueTokens
            index++
        }

        //Maybe not all contributors are loaded
        data.children.unshift(this.getData(total-sum, "#e0d9cc","Rest of contributors"))

        return data
    }

    sortById=(a,b)=>
    {
        if (a.id < b.id)
            return -1;
        if (a.id > b.id)
            return 1;
        return 0;
    }

    onValueMouseOver=(data)=>
    {
    }
    
    onValueMouseOut=(data)=>
    {
    }

    showGraph=()=>
    {
        this.setState({showGraph:true})
    }    

    render()
    {
        let userTokens="-"
        if(this.props.contributorsData)
            if(this.props.contributorsData[this.props.userAddress])
                userTokens = this.props.contributorsData[this.props.userAddress].valueTokens

        
        let data = this.buildEmptyData()
        let color = "#ff3366"
        let userOwnership = Numeral(userTokens/this.props.totalSupply).format('0.0%')
        let shares = userTokens+"/"+this.props.totalSupply
       
       if(this.state.showGraph)
            data = this.buildData( this.props.totalSupply, this.props.contributorsData, this.props.userAddress)

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