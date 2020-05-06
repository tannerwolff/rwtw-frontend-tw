import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropzone from 'react-dropzone';
import ReactQuill from 'react-quill';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET
const CLOUDINARY_UPLOAD_URL = process.env.CLOUDINARY_UPLOAD_URL

export default class UpdateBook extends Component {
    constructor(props){
        super(props);

        this.state={
            id: "",
            title: "",
            blog_status: "",
            content: "", 
            featured_image_url: "", 
            formHidden: true,
            uploadedFile:'',
            uploadedFileCloudinaryUrl: '',
            editMode: false

        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.editBlog = this.editBlog.bind(this)
        this.handleContentChange = this.handleContentChange.bind(this)
        this.handleImageDrop = this.handleImageDrop.bind(this)
        this.componentConfig=this.componentConfig.bind(this);
        this.djsConfig=this.djsConfig.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }

    handleChange(event){
      this.setState({
          [event.target.name]: event.target.value
      })
  }

  handleContentChange(value) {
    this.setState({ content: value })
    }

    handleSubmit(event){
      let id = this.state.id
      let title = this.state.title;
      let blog_status = this.state.blog_status;
      let content = this.state.content;
      let featured_image_url = this.state.featured_image_url;
        
        fetch(`https://rwtw-backend-tw.herokuapp.com/update_blog/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({title: title, blog_status: blog_status, content: content, featured_image_url: featured_image_url})
        }).then(response =>{
          response.json()
        }).then(responseData =>{
          return responseData
        }).catch(error => console.log("Fetch error", error))
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

    editBlog(){
      this.setState({editMode: true})
      this.setState({id: this.props.ourProp[0]})
      this.setState({title: this.props.ourProp[1]})
      this.setState({blog_status: this.props.ourProp[2]})
      this.setState({content: this.props.ourProp[3]})
      this.setState({featured_image_url: this.props.ourProp[4]})
  }

    componentConfig(){
        return{
            iconFileTypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: 'https://httpbin.org/post'
        }
    }

    djsConfig(){
        return{
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    deleteImage(){
        this.setState({
            featured_image_url: ""
        })
    }

  render(){
      
    return (
        
      <div>
          
          {this.state.editMode ? 
            <form>
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

                    <div className="blog-manager-content">
                        <ReactQuill
                            value={this.state.content}
                            onChange={this.handleContentChange}
                        />
                    </div>

                    <div>
                    {this.state.featured_image_url !== "" ? 
                        <div>
                            <img src={this.state.featured_image_url}  style={{width: '400px'}}/>
                            <div className="image-removal-link">
                                <a onClick={() => this.deleteImage()}>Remove Image</a>
                            </div>
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

                    <div className="submit">
                        <button onClick={this.handleSubmit}  value="submit">Add Blog</button>
                    </div>
                </form> : null}

                <button onClick={this.editBlog}><FontAwesomeIcon icon="edit"/></button>
      </div>

    );
  }
}