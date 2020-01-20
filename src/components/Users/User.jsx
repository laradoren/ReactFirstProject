import React from 'react';
import s from './Users.module.css';
import {NavLink} from 'react-router-dom';
import uPhoto from './1.jpg';

let User = ({user, followingInProgress, unfollow, follow}) => {    
        return ( <div>
                    <div >
                        <NavLink to = {'/profile/' + user.id}>
                            <img src={user.photos.large != null ? user.photos.small : uPhoto}  className = {s.usersPhoto}/>                        
                        </NavLink>
                        <div>
                            {user.followed
                                ? <button disabled = {followingInProgress.some( id => id == user.id)} 
                                    onClick = {() => {unfollow(user.id);}} 
                                >Unfollow</button>
                                : <button disabled = {followingInProgress.some( id => id == user.id)} 
                                    onClick = {() => {follow(user.id)}}  
                                >Follow </button> 
                        }
                        </div>
                        <div>
                            {user.name}
                        </div>
                    </div>
                    <div>
                        <div>{user.status}</div>
                        <div>{"u.location.city"}</div>
                        <div>{"u.location.country"}</div>
                    </div>
                </div>)
            
     
}

export default User;