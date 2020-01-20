import React from 'react';
import s from'./Posts.module.css';
import Post from './Post';
import {Field, reduxForm} from 'redux-form';
import {required, maxLengthCreator} from '../../utilts/validators/validators.js'
import {Textarea} from '../common/FormsControls/FormsControl';
let maxLength10 = maxLengthCreator(10);

const Posts = React.memo((props) => {
 
  let postsElements = props.posts.map( p => <Post message = {p.message} counts = {p.counts} /> );
  let newPostElement = React.createRef();

  let addNewPost = (values) => {
    props.addPost(values.newPostText)
  } 

  return (
    <div className = {s.content}>
          <div className = {s.user}>
            <PostsReduxForm onSubmit = {addNewPost}/>
          </div>        
        
        <h1 className = {s.item}> My post </h1>
          {postsElements}
    </div>
  );
})
const PostsForm = (props) => {
  return (
    <form onSubmit = {props.handleSubmit}>
      <Field component = {Textarea} name = 'newPostText'
             validate = {[required, maxLength10]} />
      <button>Add new post</button>
    </form>
  )
}

const PostsReduxForm = reduxForm({form: 'posts'})(PostsForm)

export default Posts;
