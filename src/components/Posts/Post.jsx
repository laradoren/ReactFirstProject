import React from 'react';
import s from'./Post.module.css';

const Post = (props) =>  {
  return (
    <div className = {s.post}>
        <img className = {s.image} src = "https://sample-videos.com/img/Sample-jpg-image-500kb.jpg" />
        <div className = {s.text}>{props.message}</div>
        <div className = {s.like}><span>Like: {props.counts}</span></div>       
    </div>
  );
}

export default Post;
