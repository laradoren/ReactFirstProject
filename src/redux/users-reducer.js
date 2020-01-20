import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utilts/object-helpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS =  "SET-USERS";
const SET_CURRENT_PAGE =  "SET-CURRENT-PAGE";
const SET_TOTAL_COUNT =  "SET-TOTAL-COUNT";
const TOOGLE_IS_FETCHING =  "TOOGLE-IS-FETCHING";
const TOOGLE_IS_FOLLOWING_PROGRESS =  "TOOGLE-IS-FOLLOWING-PROGRESS";


let initialState = {
    users : [ ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 2,
    isFetching: true,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW: 
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }; 
            
        case UNFOLLOW: 
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_COUNT: {
            return { ...state, totalUsersCount: action.count}
        }
        case TOOGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching}
        }
        case TOOGLE_IS_FOLLOWING_PROGRESS: {
            return {
                 ...state,
                followingInProgress:action.isFetching 
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
};

export const followSuccess = (userId) => ({ type: FOLLOW, userId})
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId})
export const setUsers = (users) => ({ type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_COUNT, count: totalUsersCount});
export const toogleIsFetching = (isFetching) => ({ type: TOOGLE_IS_FETCHING, isFetching});
export const toogleFollowingProgress = (isFetching, userId) => ({ type: TOOGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});

export const requestUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(toogleIsFetching(true));
        dispatch(setCurrentPage(page));
        let data = await usersAPI.requestUsers(page, pageSize);
        dispatch(toogleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));        
    }
};

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toogleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if(response.data.resultCode == 0)
        dispatch(actionCreator(userId));
        dispatch(toogleFollowingProgress(false, userId));    
}

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    }
};

export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);         
    }
};

export default usersReducer;
