import React, { Component } from 'react';
import ReactHtmlParser from "react-html-parser";


import UpdateBlog from "../Blog/update-blog";


export default class BlogDetail extends Component {
    constructor(props){
        super(props);

        this.state = {
            singleBlog : [],
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params
        fetch(`https://rwtw-backend-tw.herokuapp.com/blog/${id}`,{
            method: "GET",
            headers: {
                "accepts": "application/json",
                "Content-Type": "application/json"
            }
        }).then(response => {
            return response.json()
        }).then(data => {
            this.setState({singleBlog: data})
        }).catch(error =>{
            console.log('Fetch error', error)
        })
    }
            



  render(){
    return ( 

      <div className="all-blog-info-wrapper">
            {this.props.editMode ? null :
                <div className="blog-content-wrapper">
                    <div className="blog-featured-image">
                        <img src={this.state.singleBlog[4]} />
                    </div>
                    <div className="blog-title">
                        <h1>{this.state.singleBlog[1]}</h1>
                    </div>
                    <div className="blog-content">
                        <div className="content">{ReactHtmlParser(this.state.singleBlog[3])}</div>
                    </div>
                    
                </div>
            }

        {this.props.loggedInStatus === "LOGGED_IN"  ? <UpdateBlog  ourProp={this.state.singleBlog} /> :null}
        
      </div>

    );
  }
}
          
