import React, { Component } from 'react'
import Warning from './Warning.js'

class Page extends Component
{
    render(){

        return (
            <div>
                <div style={{ display:"flex", justifyContent:"center", alignItems:"flexStart" }}>                     
                    <div style={{margin:20, maxWidth:600, minWidth:400}}> 
                    
                        <Warning>           
                             <p>This project is in alpha stage. Don't use it for important stuff</p>        
                         </Warning>
                         
                         {this.props.children}

                     </div>                             
                </div>
            </div>
        )
    }
}

export default Page
