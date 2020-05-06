import React, { Component } from 'react';

import BlogPreview from "../Blog/blog-preview";

import introPhoto from "../../../static/assets/images/photos/intro-photo.jpg";
import homepage1 from "../../../static/assets/images/photos/homepage1.jpg";
import homepage2 from "../../../static/assets/images/photos/homepage2.jpg";
import homepage3 from "../../../static/assets/images/photos/homepage3.jpg";
import runsForPhoto from "../../../static/assets/images/photos/homepage4.jpg";
import homepage5 from "../../../static/assets/images/photos/homepage5.jpg";
import homepage6 from "../../../static/assets/images/photos/homepage6.jpg";
import homepage7 from "../../../static/assets/images/photos/homepage7.jpg";
import homepage8 from "../../../static/assets/images/photos/homepage8.jpg";
import ourStoryImage from "../../../static/assets/images/photos/homepage-our-story-photo.jpg";
import runHappyImage from '../../../static/assets/images/logos/runhappy-nontransparent.png';

export default class Home extends Component {
  
  render(){
    
    return (

      <div className="complete-home-container">
        <div className="homepage-container">
          <div className="set-insta-photos">
            <div className="single-photo">
              <img src={homepage1} />
            </div>
            <div className="single-photo">
              <img src={homepage2} />
            </div>
            <div className="single-photo">
              <img src={homepage3} />
            </div>
            <div className="single-photo">
              <img src={runsForPhoto} />
            </div>
            <div className="single-photo">
              <img src={homepage5}/>
            </div>
            <div className="single-photo">
              <img src={homepage6} />
            </div>
            <div className="single-photo">
              <img src={homepage7} />
            </div>
            <div className="single-photo">
              <img src={homepage8} />
            </div>
          </div>

          <div className="introduction-photo-wrapper">
            <div className="left-side-intro">
                <div className="intro-heading-title">
                  RUNNING WITH THE WOLFFS
                </div>

                <div className="intro-subheading">
                  Running Coach
                </div>

                <div className="intro-bio">
                  Be happy, be healthy, be at your best, and do what you love. We stand for movement and improving who you are by moving and doing things you enjoy. More than anything we want to encourage you to not only become the best running version of yourself, but to become your best self. Whether you’re just starting out or are looking to become a professional, our lessons and training may just be the perfect fit for you.
                </div>
            </div>

            <div className="right-side-intro">
              <img src={introPhoto} />
            </div>

          </div>
          
          <div className="homepage-our-story-photo-wrapper" 
            style={{backgroundImage: "url("+ourStoryImage+")"}}>    
          </div>

          <div className="blog-preview-wrapper">
            <div className="single-blog-wrapper">
              <BlogPreview />
            </div>
          </div>

          <div className="all-quote-wrapper">
            <div className="scott-jurek-quote">
              <div className="actual-quote">
                “Every single one of us possesses the strength to attempt something he isn't sure he can accomplish. It can be running a mile, or a 10K race, or 100 miles. It can be changing a career, losing 5 pounds, or telling someone you love her (or him).”
              </div>
              
              <div className="scott-jurek">
                - Scott Jurek
              </div>
            </div>
          </div>

          <div className="alex-runs-for-wrapper"
            style={{backgroundImage: "url("+runsForPhoto+")"}}>
              <h1>Alex Runs For</h1>
              <img src={runHappyImage} />
          </div>
          
        
        </div>
      </div>

    );
  }
}