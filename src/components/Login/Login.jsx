import React from 'react';
import {reduxForm, Field} from "redux-form"
import { Input, createField } from '../common/FormsControls/FormsControl';
import { required } from '../../utilts/validators/validators';
import {login} from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const LoginForm = ({handleSubmit, error}) => {
    return (
            <form onSubmit = {handleSubmit}>
                {createField("Email", "email", [required], Input)}
                {createField("Password", "password", [required], Input , {type: "password"})}
                {createField(null, "rememberMe", [], Input , {type: "checkbox"}, "remember me")}
                {error && <div>
                    ERROR in email or password
                </div>}
                <div>
                    <button>Log In</button>
                </div>
            </form>
        )    
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }
    if(props.isAuth) {
        return <Redirect to = {"/profile"} />
    }
    return <div> 
            <h1>Login</h1>
           <LoginReduxForm onSubmit = {onSubmit}/>
         </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);

