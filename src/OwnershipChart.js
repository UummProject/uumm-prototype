import React from 'react'
import {Sunburst} from 'react-vis';

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
        var userData= this.getData(userTokens, "0#ff3366", "you")
        var restData= this.getData(restTokens, "0#aa3366", "rest")
        var data = {
            children:[userData, restData]
        }
        return data
    }

    render()
    {

        var data = this.buildData(this.props.userTokens, this.props.totalSupply-this.props.userTokens)
        return (
            <div >             
            <Sunburst
              hideRootNode
              colorType="literal"
              data={data}
              height={200}
              width={200}/>              
            </div>
        )
    }
}

export default OwnershipChart