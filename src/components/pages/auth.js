import React, { Component } from "react";
import axios from 'axios';

import loginPhoto from "../../../static/assets/images/photos/login-photo.jpg";

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ad_email: "",
      ad_password: "",
      errorText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: ""
    });
  }

  handleSubmit(event){
    axios
    .post(
      "https://rwtw-backend-tw.herokuapp.com/auth",
      { ad_email: this.state.ad_email, ad_password : this.state.ad_password}, 
          
      )
    .then(response => {
      if (response.data === "LOGGED_IN") {
        this.props.handleSuccessfulLogin();
        {this.props.history.push("/")}
      } else if(response.data === "NOT_LOGGED_IN"){
        this.setState({
          errorText: "Wrong email or password"
        });
        this.props.handleUnsuccessfulLogin();
      } else {
        this.setState({
          errorText: "Something else went wrong"
        })
      }
    })
    .catch(error =>{
        console.log('Fetch Error', error)
        this.props.handleUnsuccessfulLogin();
    })

    event.preventDefault();
}

  
  render() {
    return (
      <div className="login-container">
          <div className="login-left-side">
              <img src={loginPhoto} />
          </div>
          <div className="login-right-side">
            <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>
            <div>{this.state.errorText}</div>
            <form onSubmit={this.handleSubmit} className="auth-form-wrapper">
            <div className="form-group">
                <input
                  type="email"
                  name="ad_email"
                  placeholder="Your email"
                  value={this.state.ad_email}
                  onChange={this.handleChange}
                />
            </div>

            <div className="form-group">
                <input
                    type="password"
                    name="ad_password"
                    placeholder="Your password"
                    value={this.state.ad_password}
                    onChange={this.handleChange}
                />
                </div>

            
                <button className="btn" type="submit">Login</button>
            
            </form>
        </div>
      </div>
    );
  }
}