import React, { Component } from 'react';
import contactImage from "../../../static/assets/images/photos/login-photo.jpg";


export default class App extends Component {
    constructor(){
      super();
  
      this.state ={
        name: "",
        email: "", 
        subject: "", 
        message: ""
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    handleChange(event){
      this.setState({
        [event.target.name] : event.target.value
      })
    }
  
    handleSubmit(event){
      event.preventDefault()
  
      fetch("https://rwtw-backend-tw.herokuapp.com/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name: this.state.name, email: this.state.email, subject: this.state.subject, message: this.state.message})
      }).then(response =>{
        return response.json()
      }).then(responseData =>{
        console.log(responseData)
      }).catch(error =>{
        console.log("error in submit", error)
      })
      this.clearContactForm();
    }
  
    clearContactForm(){
      this.setState({
        name: "",
        email: "", 
        subject: "", 
        message: ""
      })
    }
    render() {
      return (
        <div className='complete-contact-page-container'>
            <div className="left-side-contact-container">
                <img src={contactImage} />
            </div>

            <div className="right-side-contact-container">

                <h1>Email Me</h1>

                <form className="contact-form" onSubmit = {this.handleSubmit}>
                    <input 
                        type="text"
                        name = "name"
                        placeholder="Full Name"
                        onChange = {this.handleChange}
                        value = {this.state.name}
                    />
        
                    <input 
                        type="email"
                        name = "email"
                        placeholder="Email"
                        onChange = {this.handleChange}
                        value = {this.state.email}
                    />
        
                    <input 
                        type="text"
                        name = "subject"
                        placeholder="Subject"
                        onChange = {this.handleChange}
                        value = {this.state.subject}
                    />
        
                    <textarea 
                    type="text"
                    name = "message"
                    placeholder="Message"
                    onChange = {this.handleChange}
                    value = {this.state.message}
                    />
        
                    <button
                    type="submit">Submit</button>
                </form>
            </div>
        </div>
          
      );
    }
  }