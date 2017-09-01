import React from 'react'
import {Sunburst} from 'react-vis'
import Numeral from 'numeral'
import Chroma from 'chroma-js'

const startColor= "#ff3366"
const endColor= "#ffdc00"

class ProposalChart extends React.Component {

    constructor(props)
    {
        super()
        this.state = {
            color:startColor,
            stake:0,
            id:undefined,
            user:{}
        }
        this.resetTimeout = {}
        window.setTimeout(this.showGraph,3000)
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

    buildData=(positive, negative, total, user)=>
    {
        let rest = total-positive-negative
        let positiveData = this.getData(positive);
        let negativeData = this.getData(negative);
        let restData = this.getData(rest);
        if(user>0)
            positiveData.children.push(this.getData(user))
        else if(user<0)
            negativeData.children.push(this.getData(-user))

        let data = {
            children:[positiveData, negativeData, restData]
        }

        return data
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

export default ProposalChart