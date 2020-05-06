import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import nuunImage from '../../static/assets/images/logos/nuun-logo.png'
import honeyStingerImage from '../../static/assets/images/logos/honey-stinger-logo.png'
import runHappyImage from '../../static/assets/images/logos/runhappy-logo.png'


import NavigationContainer from './navigation/navigation-container';
import Auth from './pages/auth';
import Home from './pages/home';
import OurStory from './pages/our-story';
import Blogs from './pages/blog';
import BlogDetail from './pages/blog-detail';
import BlogManager from './pages/blog-manager';
import Coaching from './pages/coaching';
import TrainingPrograms from './pages/training-programs';
import Contact from './pages/contact';
import NoMatch from "./pages/no-match";
import Icons from './helpers/icons';

export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      sub_email: ""
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    this.handleClear = this.handleClear.bind(this)
    this.handleEmailSubmission = this.handleEmailSubmission.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleEmailSubmission(){
    event.preventDefault();

    let sub_email = this.state.sub_email

    fetch('https://rwtw-backend-tw.herokuapp.com/email/sub', {
        method: 'POST',
        headers:{
            "Content-Type" : "application/json"
        }, body: JSON.stringify({sub_email})
    }).then(response =>{
        return response.json()
    }).catch(error =>{
        console.log('Error in Sub Email post', error)
    })
    this.handleClear();
  }

  handleClear(){
    this.setState({
      sub_email: ""
    })
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  authorizedPages() {
    return [
      <Route
        key="blog-manager"
        path="/blog-manager"
        component={BlogManager}
      />
    ];
  }


  render() {
    return (
      <div className='app'>
        

        <div className="all-rwtw-header">
            <Router>
              <div>
              <NavigationContainer
              loggedInStatus={this.state.loggedInStatus}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
              />

                <Switch>
                <Route
                    path="/auth"
                    render={props => (
                      <Auth
                        {...props}
                        handleSuccessfulLogin={this.handleSuccessfulLogin}
                        handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                      />
                    )}
                  /> 
                  <Route exact path="/" component = {Home} />
                  
                  <Route 
                    path="/blog/:id"
                    render={props => (
                      <BlogDetail {...props} loggedInStatus ={this.state.loggedInStatus} />
                    )} 
                  />

                  <Route path="/ourstory" component = {OurStory} />
                  <Route path="/blogs"  
              
                  render={props =>(
                    <Blogs {...props} loggedInStatus ={this.state.loggedInStatus} />
                  )}
                  />
                  {this.state.loggedInStatus === "LOGGED_IN" ? (
                    this.authorizedPages()
                    ) : null}

                  {/* <Route path="/coaching" component = {Coaching} />
                  <Route path="/trainingprograms" component = {TrainingPrograms} /> */}
                  <Route path="/contact" component = {Contact} />
                  <Route component={NoMatch} />
                </Switch>
              </div>
            </Router>
            
      
        </div>


        <div className="all-footer">
          <div className="all-footer-but-copyright">
            <div className="rwtw-footer-left">
              <h2>RUNNING WITH THE WOLFFS</h2>
              <h3>runningwiththewolffs@gmail.com</h3>
              <div className="sponsor-logos">
                <img src={runHappyImage} 
                style={{ height: 75, width: 85 }}/>
                <img src={nuunImage}
                style={{ height: 75, width: 75}}/>
                <img src={honeyStingerImage} 
                style={{ height: 75, width: 150 }}/>
              </div>
              
            </div>

            <div className="rwtw-footer-right">
              <h2>Subscribe form</h2>
              <form onSubmit = {this.handleEmailSubmission}>
                <input 
                  type="text"
                  name="sub_email"
                  placeholder="Email Address"
                  onChange = {this.handleChange}
                  value = {this.state.sub_email}
                
                >
                </input>
                <button>Submit</button>
              </form>
            </div>
          </div>

          <div className="copyright-links-wrapper">
            <div className="copyright-statement">
              <h4>Copyright 2020 by Running with the Wolffs</h4>
            </div>

            <div className="copyright-links">
              <div className="pinterest-link">
                <SocialIcon target="_blank" url="https://www.pinterest.com/runningwiththewolffs/" bgColor="#ffffff" style={{ height: 35, width: 35 }} />
              </div>

              <div className="instagram-link">
                <SocialIcon target="_blank" url="https://www.instagram.com/runningwiththewolffs/" bgColor="#ffffff" style={{ height: 35, width: 35 }}/>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}


        
        


