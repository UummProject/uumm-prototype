import React from 'react'
import {Sunburst} from 'react-vis'
import Numeral from 'numeral'
import Chroma from 'chroma-js'

const startColor= "#ff3366"
const endColor= "#ffdc00"

class OwnershipChart extends React.Component {

    constructor(props)
    {
        super()
        this.state = {
            color:startColor,
            stake:0,
            id:-1
        }
        this.resetTimeout = {}
        window.setTimeout(this.showGraph,3000)
    }

    componentWillReceiveProps =(newProps)=>
    {
        if(newProps.contributorsData)
            if(newProps.contributorsData[newProps.userAddress])
                this.setState({
                    user:newProps.contributorsData[newProps.userAddress],
                    selectedId:newProps.contributorsData[newProps.userAddress].id,
                    color:startColor,
                    stake:newProps.contributorsData[newProps.userAddress].valueTokens
                })
    }

    getData=(size= 0 ,color = "#e0d9cc" ,title="", children=[], id:-1)=>
    {
        return {
            title:title,
            color:color,
            size:size,
            children:children,
            id:id
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

        let colors = Chroma.scale([startColor,endColor]).mode('lch').colors(array.length)
        colors=this.rotateArray(colors, this.state.user.id)
        array.sort(this.sortById)
        let index = 0

        for (let contributor of array)
        {
            let color = Chroma(colors[index]).desaturate(4).hex()
            if(this.state.selectedId === contributor.id)
                color= Chroma(colors[index]).hex()

            let d = this.getData(contributor.valueTokens, color , contributor.address,[], contributor.id)
            
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

    rotateArray=(array, positions)=>
    {
        for(let i=0;i<positions;i++)
            array.unshift(array.pop())
        return array
    } 

    onMouseOver=(data)=>
    {
        this.setState({
            selectedId:data.id,
            color:data.color,
            stake:data.size,
        })

        clearTimeout(this.resetTimeout);
        this.resetTimeout = window.setTimeout(()=>{
            this.onMouseOut()
        },2000)
    }
    
    //Not triggering for unkown reason
    onMouseOut=(data)=>
    {
        this.setState({
            selectedId:this.state.user.id,
            color:startColor,
            stake:this.state.user.valueTokens,
        })
    }

    showGraph=()=>
    {
        this.setState({showGraph:true})
    }    

    render()
    {
        let data = this.buildEmptyData()
        let userOwnership = Numeral(this.state.stake/this.props.totalSupply).format('0.0%')
        let shares = this.state.stake+"/"+this.props.totalSupply
       
       if(this.state.showGraph)
            data = this.buildData( this.props.totalSupply, this.props.contributorsData, this.props.userAddress)

        return (
            <div style={{"position":"relative"}}> 
               
                <div style={this.getCenterContentStyle()}>
                      <h2 style={{"color":this.state.color,"margin":2}}> {userOwnership}</h2>
                      <h4 style={{"color":"#aa3366","margin":2}}> {shares}</h4>                  
                </div> 

                <Sunburst
                    onValueMouseOut={this.onMouseOut}
                    onValueMouseOver={this.onMouseOver} 
                    animation
                    hideRootNode
                    colorType="literal"
                    data={data}
                    height={this.props.size}
                    width={this.props.size}
                    />
                 
            </div>
        )
    }
}

export default OwnershipChart