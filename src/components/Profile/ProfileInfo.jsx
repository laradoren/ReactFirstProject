import React, {useState} from 'react';
import s from'./Profile.module.css';
import Preloader from '../common/Preloader/Preloader';
import uPhoto from './1.jpg';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({profile, status, updateStatus}) => {
  let [editMode, setEditMode]  =  useState(false);
  
  if (!profile) 
    return <Preloader/>  
  
    return ( 
    <div>
      <div className = {s.header}>
        <div className = {s.info}>
          <img src = {profile.photos.large != null ? profile.photos.large : uPhoto}  className = {s.usersPhoto}/>    
          { editMode ? <ProfileDataForm profile = {profile} /> : <ProfileData profile = {profile} /> }
          <div> <b>Status: </b> <ProfileStatusWithHooks status = {status} updateStatus = {updateStatus} />
          </div>
        </div>
      </div>       
    </div>
  );
}

const ProfileData = ({profile}) => {
  return(
    <div>
       <div> <b>Full name:</b> {profile.fullName} </div>
          <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? "Yes" : "No"}
          </div>
          { profile.lookingForAJob && 
          <div>
            <b>My professianal skills:</b> {profile.lookingForAJobDescriptio}
          </div>
          }
          <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
              return <Contact key = {key} contactTitle = {key} contactValue = {profile.contacts[key]}  />
            })}
          </div>
    </div>
  )
}

const ProfileDataForm = ({profile}) => {
  return(
    <div>
       <div> <b>Full name:</b> {profile.fullName} </div>
          <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? "Yes" : "No"}
          </div>
          { profile.lookingForAJob && 
          <div>
            <b>My professianal skills:</b> {profile.lookingForAJobDescriptio}
          </div>
          }
          <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
              return <Contact key = {key} contactTitle = {key} contactValue = {profile.contacts[key]}  />
            })}
          </div>
    </div>
  )
}


const Contact = ({contactTitle, contactValue}) => {
  return (
    <div className = {s.contact}>
      <b>{contactTitle}:</b> {contactValue}
    </div>
  )
}

export default ProfileInfo;
