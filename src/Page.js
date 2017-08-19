import React, { Component } from 'react'

class Page extends Component
{
    render(){

        return (
                    <div>
                        <div style={{
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"flexStart"
                            }}>                     
                               <div style={{margin:20, maxWidth:600, minWidth:400}}>   
                                    {this.props.children}                         
                                </div>                             

                        </div>
            </div>
        )
    }
}

export default Page
