import React from 'react';
import s from'./Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import {addPostMessageCreator} from './../../redux/dialogs-reducer';
import {Field, reduxForm} from "redux-form";
import { Textarea } from '../common/FormsControls/FormsControl';
import { required, maxLengthCreator } from '../../utilts/validators/validators';

let maxLength10 = maxLengthCreator(10);

const Friend = (props) => {
    let path = "/dialogs/" + props.num;
    return(
    <div className = {s.friend + ' ' + s.active}>        
        <NavLink to = {path}> {props.name} </NavLink> 
    </div>
    )
}

const Messege = (props) => {
    return(
        <div className =  {s.messege}>{props.text}</div>
    );
}

const Dialogs = (props) => {
    let state = props.dialogsPage; 

    let dialogsElements = state.dialogs.map( d => <Friend name = {d.name} key = {d.id} num = {d.id} /> );
    let messegesElements = state.messeges.map( m => <Messege key = {m.id} text = {m.text}  /> );
    
    let addMessege = (values) => {
        alert(values.newMessageBody);
    }
    return (
        <div className = {s.dialogs}>
            <div className = {s.dialogItems}>
               {dialogsElements}                                
            </div>
            <div className = {s.messeges}>
                {messegesElements} 
                <div  className = {s.user} >
            <DialogsReduxForm onSubmit = {addMessege} />
            </div>
            </div>
            
            
        </div>
    );
}

const DialogsForm = (props) => {
    return (
        <form onSubmit = {props.handleSubmit}>
            <Field component = {Textarea}  validate = {[required, maxLength10]} 
                    name = 'newMessageBody' placeholder = 'Enter the messege:'/>
            <button> Send messege </button>
        </form>
    )

}

const DialogsReduxForm = reduxForm({form: 'dialogs'})(DialogsForm)


export default Dialogs;