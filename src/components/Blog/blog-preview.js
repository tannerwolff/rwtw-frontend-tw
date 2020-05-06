import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom';

export default class BlogPreview extends Component {
    constructor(){
        super();

        this.state={
            isLoading: true, 
            blogItems: []
        }

    }

    componentWillMount(){
        fetch('https://rwtw-backend-tw.herokuapp.com/blogs', {
          method: 'GET',
          headers:{
            "accepts" : "application/json",
            "Content-Type" : "application/json"
          }
        }).then(response =>{
          return response.json()
        }).then(data =>{
          data.reverse()
          this.setState({
            blogItems:data.slice(0, 3),
            isLoading: false
          })
        }).catch(e => {
          console.log('Fetch error', e)
        })
    }

  render(){
    const blogRecords = this.state.blogItems.map(blogItem =>{
    return (

        <div key={blogItem[0]} className="homepage-blog-preview-wrapper">
            <div className="homepage-blog-wrapper">
                <div className="homepage-blog-preview">
                    <div className="total-blog-preview ">
                        <Link 
                            style={{backgroundImage: "url("+blogItem[4]+")"}}
                            to={`/blog/${blogItem[0]}`}
                        >
                            <h1>
                                {blogItem[1]}
                            </h1>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      

    );
    })
    return(
        <div className="homepage-blog-preview-wrapper">
            {this.state.isLoading ? (
                <div className="content-loader">
                <FontAwesomeIcon icon="spinner" spin />
            </div>
            ): blogRecords}
        </div>
    )
    
  }

}