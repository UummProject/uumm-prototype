import React, { Component } from 'react'

class Warning extends Component
{
    render(){

        let style = {
            backgroundColor:'rgba(158, 158, 158, 0.22)',
            paddingTop:10,
            paddingBottom:10,
            paddingLeft:20,
            paddingRight:20,
            marginBottom:20
         }

         if(this.props.important)
            style.backgroundColor = 'rgba(158, 0, 0, 0.22)'

        return (
             <div style={style}>  
                    {this.props.children}                         
            </div>                             
        )
    }
}

export default Warning
