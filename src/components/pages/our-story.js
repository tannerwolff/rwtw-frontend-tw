import React, { Component } from 'react';

import ourStoryImage from '../../../static/assets/images/photos/our-story-photo.jpg'

export default class OurStory extends Component {

  render(){
    return (

      <div className="our-story-container">
        <div className="our-story-content-wrapper">
          <h1>OUR STORY</h1>
          <img src={ourStoryImage} />
          <div className="paragraph-wrapper">
            <p>As a Running Coach our main goal is to support you in becoming the best version of yourself, both as a runner, and as a person. We want to encourage you to train hard, and implement daily lifestyle habits that help you chase all your dreams. When you want to improve as a runner, you train harder, get a coach, and push more. When you want to improve to become the best version of yourself you need to do those same things. </p>

            <p>Running With The Wolffs shares personal experiences, running tips/tricks, as well as lifestyle habits to become the best of who you are, and embrace yourself! Here you will find opportunities to train with us, you'll find a lot of free content, alongside coaching and training program opportunities. </p>
    ​
            <p>A little more about, Alex Chase (soon to be Wolff)...

              "If you havn't caught on, Running With The Wolffs was a fun take on my future last name, our running family, my career and dreams, as well as the motivation I needed to remember to run alongside all those within my community to continue to improve and become the best version of who I am. AND just so you know I know what I am talking about while you're on our site, here are all my fun qualifications; </p>

            <p>I am currently the Head Cross Country/Track & Field Coach at Dawson Community College. Prior to coaching here, I coached at the high school and middle school levels in both cross country and track. I also assisted at the collegiate level in strength and conditioning at the program I ran cross country and track at in college. I have bachelors in Health and Human Performance and Exercise Science, and currently am finishing up my Master's in Kinesiology with a focus in Sports Performance and Sports Nutrition. I am a Certified Strength and Conditioning Specialist (NSCA), and a Certified Running Coach. I love running and love coaching. I am doing exactly what I love and am called to do as a coach and am just so glad you are here. Please feel free to contact me with any questions, and I look forward to running with you!" </p>
          </div>
        </div>
  ​
      </div>
    );
  }
}




