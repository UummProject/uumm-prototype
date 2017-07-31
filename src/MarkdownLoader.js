import React from 'react'
import Axios from 'axios'
import ReactMarkdown from'react-markdown'

class MarkdownLoader extends React.Component {

    constructor(props)
    {
        super()

        this.state = {markdownText:""}

        if(props.url)
            Axios.get(props.url)
            .then((result)=> {    
                this.setState({markdownText:result.data})
          });
    }

   
    render()
    {
        return (
            <div className="markdown" >             
                <ReactMarkdown source={this.state.markdownText}/>
            </div>
        )
    }
}

export default MarkdownLoader