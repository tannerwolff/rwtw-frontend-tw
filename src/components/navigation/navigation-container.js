import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class NavigationContainer extends Component {
  constructor(props){
    super(props);
    

  }

  

  handleSignOut=() =>{
    this.props.handleSuccessfulLogout();
  }

  render(){
    const dynamicLink = (route, linkText) =>{
      return(
          <div className="nav-link-wrapper">
              <NavLink to={route} activeClassName="nav-link-active">
                {linkText}
              </NavLink>
          </div>
      );
  };
    return (

      <div className="all-nav-wrapper">
        
        <h1>RUNNING WITH THE WOLFFS</h1>
        <div className="navbar-links-wrapper">
          <div className="left-side-nav-wrapper">

            <div className="nav-link-wrapper">
              <NavLink exact to="/" activeClassName="nav-link-active">
                  HOME
              </NavLink>
            </div>

            <div className="nav-link-wrapper">
              <NavLink to="/ourstory" activeClassName="nav-link-active">
                  OUR STORY
              </NavLink>
            </div>

            <div className="nav-link-wrapper">
              <NavLink to="/blogs" activeClassName="nav-link-active">
                  BLOG
              </NavLink>
            </div>

            {this.props.loggedInStatus === "LOGGED_IN" ? (dynamicLink("/blog-manager","BLOG MANAGER")) : null}

            
            {/* <div className="nav-link-wrapper">
              <NavLink to="/coaching" activeClassName="nav-link-active">
                  COACHING
              </NavLink>
            </div> */}

            {/* <div className="nav-link-wrapper">
              <NavLink to="/trainingprograms" activeClassName="nav-link-active">
                  TRAINING PROGRAMS
              </NavLink>
            </div> */}

            <div className="nav-link-wrapper">
              <NavLink to="/contact" activeClassName="nav-link-active">
                  CONTACT
              </NavLink>
            </div>

          </div>

          <div className="right-side-nav-wrapper">
            <div className="pinterest-link nav-right">
              <SocialIcon target="_blank" url="https://www.pinterest.com/runningwiththewolffs/" bgColor="#ffffff" style={{ height: 35, width: 35 }} />
            </div>

            <div className="instagram-link nav-right">
              <SocialIcon target="_blank" url="https://www.instagram.com/runningwiththewolffs/" bgColor="#ffffff" style={{ height: 35, width: 35 }}/>
            </div>

            <div className="instagram-link nav-right">
              {this.props.loggedInStatus === "LOGGED_IN" ? <a onClick={this.handleSignOut}>Sign out<FontAwesomeIcon icon="sign-out-alt" /></a> : null}
            </div>
          </div>
        </div>
          
      </div>

    );
  }
}