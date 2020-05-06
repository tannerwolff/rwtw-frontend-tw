import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import ReactQuill from 'react-quill';

const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET
const CLOUDINARY_UPLOAD_URL = process.env.CLOUDINARY_UPLOAD_URL


export default class BlogManager extends Component {
    constructor(props){
        super(props);

        this.state={
            title: "",
            blog_status: "draft",
            content:"",
            featured_image_url: "",
            uploadedFile: null,
            uploadedFileCloudinaryUrl: "",
            image_src: null, 
            editMode: false,
            blogToEdit: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleBlogSubmission = this.handleBlogSubmission.bind(this);
        this.handleImageDrop = this.handleImageDrop.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }


    handleImageDrop(files){
        this.setState({
            uploadedFile: files[0]
        })
        const currentFile = files[0]
        const myFileItemReader = new FileReader()
        myFileItemReader.addEventListener("load", () => {
            this.setState({
                image_src: myFileItemReader.result
            })
        }, false)
        myFileItemReader.readAsDataURL(currentFile)

        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
                .field("file", this.state.uploadedFile);
            upload.end((err, response) => {
                if (err){
                    console.log(err)
                } if (response.body.secure_url !== ""){
                    this.setState({
                        featured_image_url: response.body.secure_url
                    })
                }
            })
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleContentChange(value) {
        this.setState({ content: value })
    }

    handleBlogSubmission(event){
        event.preventDefault();

        let title = this.state.title
        let blog_status = this.state.blog_status
        let content = this.state.content
        let featured_image_url = this.state.featured_image_url

        fetch('https://rwtw-backend-tw.herokuapp.com/blog/input', {
            method: 'POST',
            headers:{
                "Content-Type" : "application/json"
            }, body: JSON.stringify({title, blog_status, content, featured_image_url})
        }).then(response =>{
            return response.json()
        }).catch(error =>{
            console.log('error in handle Blog Submission', error)
        })
        this.handleClear();
        {this.props.history.push("/blogs")}
    }


    handleClear(){
        this.setState({
            title: "",
            blog_status: "draft",
            content:"",
            featured_image_url: "",
            uploadedFile: null,
            uploadedFileCloudinaryUrl: "",
            image_src: null,
        })
    }

    

  render(){
    return (

      <div className="all-blog-manager-container">
          <div className="all-blog-manager-forms">
              <form>
                <div className="first-set">
                    <div className="blog-manager-title">

                        <input
                            type="text"
                            name="title"
                            placeholder="Blog Title"
                            value = {this.state.title}
                            onChange = {this.handleChange}
                        />

                    </div>
                    <div className="blog-manager-blog_status">
                        <select
                            type="text"
                            name="blog_status"
                            value = {this.state.blog_status}
                            onChange = {this.handleChange}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>  
                
                    
                </div>


                <div className="blog-manager-content">
                    <ReactQuill
                        value={this.state.content}
                        onChange={this.handleContentChange}
                    />
                </div>

                <div className="blog-manager-image">
                    {this.state.image_src !== null ? 
                    <div>
                        <img src={this.state.image_src}  style={{width: '400px'}}/>
                    </div > :
                    <Dropzone 
                        onDrop={this.handleImageDrop}
                        multiple= {false}
                        accept="image/*"
                    >
                        Add a picture
                    </Dropzone>
                    }
                </div>

                <div className="blog-manager-submit">
                    <button onClick={this.handleBlogSubmission}  value="submit">Add Blog</button>
                </div>
              </form>
          </div>
      </div>

    );
  }
}

