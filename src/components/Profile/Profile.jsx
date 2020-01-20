import React from 'react';
import PostsContainer from '../Posts/PostsContainer';
import ProfileInfo from './ProfileInfo';

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo profile = {props.profile} status = {props.status} updateStatus = {props.updateStatus} />
      <PostsContainer/>
    </div>
  );
}

export default Profile;
