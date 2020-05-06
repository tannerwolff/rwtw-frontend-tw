import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Truncate from 'react-truncate';
import striptags from 'striptags';
import ReactHtmlParser from "react-html-parser";


import DeleteAction from '../Blog/delete-blog';

export default class Blogs extends Component {

  constructor(props){
    super(props);

    this.state={
      isLoading: true, 
      blogItems: [],
    }

  }

  componentDidMount(){
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
        blogItems:data,
        isLoading: false
      })
    }).catch(e => {
      console.log('Fetch error', e)
    })
  }

  componentWillUnmount(){
    this.setState({
      blogItems: []
    })
  }

  

  render(){
    const blogRecords = this.state.blogItems.map(blogItem =>{
      if (this.props.loggedInStatus === "LOGGED_IN"){
        return (
          <div key={blogItem[0]} className="full-blog-page-container">
            <div className="blogs-page-container">

                <div className="all-blogs-page-content">
                  <div className="single-blog-wrapper">
                    <div className="blogs-page-featured-image">
                      <img src={blogItem[4]} />
                    </div>
                    <div className="blogs-page-title">
                    <Link to={`/blog/${blogItem[0]}`}><h1>{blogItem[1]}</h1></Link>
                      
                    </div>
                    <div className="blogs-page-content">
                      <Truncate lines={3} ellipsis={
                        <span>
                          ...<Link to= {`/blog/${blogItem[0]}`}>Read More</Link>
                        </span>
                        }
                        >
                          <div className="content">{ReactHtmlParser(blogItem[3])}</div>
                      </Truncate>
                    </div>
                  </div>

                  <DeleteAction id={blogItem[0]}/>
              
                </div>
            </div>
          </div>
        )
      } else {
        return (

          <div key={blogItem[0]} className="full-blog-page-container">
            <div className="blogs-page-container">
      
                <div className="all-blog-page-content">
                  <div className="single-blog-wrapper">
                    <div className="blogs-page-title">
                    <Link to={`/blog/${blogItem[0]}`}><h1>{blogItem[1]}</h1></Link>
                    </div>
                    <div className="blogs-page-featured-image">
                      <img src={blogItem[4]} />
                    </div>
                    <div className="blogs-page-content">
                      <Truncate lines={3} ellipsis={
                          <span>
                              ...<Link to= {`/blog/${blogItem[0]}`}>Read More</Link>
                          </span>
                      }
                      >
                          {striptags(blogItem[3])}
                      </Truncate>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        );
      }
      
  })
                    
  return (

    <div className="all-blog-content-container">
      {this.state.isLoading ? (
        <div className="content-loader">
          <FontAwesomeIcon icon="spinner" spin />
        </div>
      ): blogRecords}
    </div>


  );
}
}
    
    
    


      
