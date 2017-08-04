import React from 'react'
import {Sunburst} from 'react-vis';
import Numeral from 'numeral'

class ProposalVotesChart extends React.Component {

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

    buildData=(positive, negative, total)=>
    {
        var positiveData= this.getData(positive, "#ff3366", "Positive")
        var negativeData= this.getData(negative, "#aa3366", "Negative")
        //var restData= this.getData(total-positive-negative, "#aa33aa", "Rest")
        var data = {
            children:[positiveData, negativeData]
        }
        return data
    }

    render()
    {
        var data = this.buildData(this.props.positive, this.props.negative, this.props.total)
        var color = "#ff3366"
        var split = this.props.positive+" - "+this.props.negative
        var participation = Numeral((this.props.positive+this.props.negative)/this.props.total).format('0.0%')
        return (

            <div style={{"position":"relative"}}> 
               
                <div style={this.getCenterContentStyle()}>
                      <h3 style={{"color":color,"margin":2}}> {split}</h3>
                      <h5 style={{"color":color,"margin":2}}> {participation}</h5>
                                       
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

export default ProposalVotesChart