import React from 'react';
import {addPostMessageCreator} from './../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/AuthRedirect';
import { compose } from '../../../../../../Users/Alina/AppData/Local/Microsoft/TypeScript/3.6/node_modules/redux';

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    };
};
let mapDispatchToProps = (dispatch) => {
    return{
        sendMessage: () => {
            dispatch(addPostMessageCreator());
        }
    };   

};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect    
)(Dialogs);;