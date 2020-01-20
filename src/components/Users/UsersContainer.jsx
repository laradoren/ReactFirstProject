import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import { follow, unfollow, setCurrentPage, toogleFollowingProgress, requestUsers} from '../../redux/users-reducer';
import Preloader from '../common/Preloader/Preloader';
import { compose } from '../../../../../../Users/Alina/AppData/Local/Microsoft/TypeScript/3.6/node_modules/redux';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors';

class UsersContainer extends React.Component {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    };    
    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.requestUsers(pageNumber, pageSize);
    };
    render(){
            return <> 
            {this.props.isFetching ?
                <Preloader />
             : null} 
                <Users  
                totalUsersCount = {this.props.totalUsersCount}
                pageSize = {this.props.pageSize}
                currentPage = {this.props.currentPage}
                users = {this.props.users}
                onPageChanged = {this.onPageChanged}
                unfollow = {this.props.unfollow}
                follow = {this.props.follow}
                followingInProgress = {this.props.followingInProgress}
                
            />
        </>
    }
}

/*let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}*/

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default compose(
    connect(mapStateToProps, {
        follow, unfollow, unfollow,
        setCurrentPage, toogleFollowingProgress,
        requestUsers
    })
)(UsersContainer);