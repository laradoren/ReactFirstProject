import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = " SET-USER-PROFILE";
const SET_STATUS = "SET-STATUS";

let initialState = {
    posts : [
        {id: 1, message : 'Hi! It`s my first post!', counts: 14},
        {id: 2, message : 'How are you?', counts: 20},
        {id: 3, message : 'Weather is fine)', counts: 12}
    ],
    newPostText : "Alina",
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                counts: 11
            };      
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status : action.status
            }
        }
        default:
            return state;
    }
};

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile});
export const setStatus= (status) => ({ type: SET_STATUS, status});

export const getProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
};

export const getStatus = (userId) => async (dispatch) => {           
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {        
    let response = await profileAPI.updateStatus(status);
    if(!response.data.resultCode)
        dispatch(setStatus(status));
};

export default profileReducer;
