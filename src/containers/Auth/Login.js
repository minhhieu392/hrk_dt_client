import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import '../Auth/Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi , handleRegisterApi } from '../../services/userService';
import {LOCAL_STORAGE_TOKEN_NAME} from '../../utils/constant';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {//khoi tao state
            username: '',
            password: '',
            firstname:'',
            lastname:'',
            isShowPassword: false,
            errMessage:'',
            signIn: true,
            errMessage:''
        }
    }
    //cap nhat lai gia tri cho state
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleOnChangeFirstName = (event) => {
        this.setState({
            firstname: event.target.value
        })
    }
    handleOnChangeLastName = (event) => {
        this.setState({
            lastname:event.target.value
        })
    }

    handleRegister = async () => {
        try{
            let data = await handleRegisterApi(
                this.state.username,
                this.state.password,
                this.state.firstname,
                this.state.lastname
                );
            if (data && data.errCode == 0) {
                alert("Đăng ký thành công !")
            }
        }catch(e) {
            console.log(e.response);
        }
    }

    handleLogin = async () => {
        // console.log('username: ', this.state.username , 'password: ', this.state.password)
        // , tuong duong +
        // console.log('allstate', this.state)
        //xoa message loi moi khi thuc hien
        this.setState({
            errMessage:''
        })
        try{
            let data = await handleLoginApi(this.state.username, this.state.password);
            if(data && data.errCode !==0){
                this.setState({
                    errMessage: data.message
                })
                console.log(data);
            }
            if(data && data.errCode === 0){
                console.log('token', data)
                //todo 
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, data.token1)
                this.props.userLoginSuccess(data.user)
                console.log('login success')
            }
        }catch(e){
            if(e.response){
                if(e.response.data){
                    this.setState({
                        erressage: e.response.data.message
                    })
                }
            }
            console.log(e.response);           
        }  
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }
    }
    
    signInButton = () => {
        this.setState({
            signIn: !this.state.signIn
        })
    };
    
    render() {
        return (
            <div className='body'>
                {/* <div className="custom">
                    <label for="email">Email address:</label>
                    <input type="email" 
                    class="form-control" 
                    placeholder="Enter email" 
                    id="email"
                    value={this.state.username}
                    onChange={(event)=> this.handleOnChangeUsername(event)}
                    />
                    <label for="pwd">Password:</label>
                    <div className="custom-input-password">
                        <input type={this.state.isShowPassword ? 'text' : 'password'} 
                        class="form-control" 
                        placeholder="Enter password" 
                        id="pwd"
                        onChange={(event)=> this.handleOnChangePassword(event)}
                        onKeyDown = {(event) => this.handleKeyDown(event)}
                        />
                        <span onClick={() => {this.handleShowHidePassword()}}>
                            
                            <i class={this.state.isShowPassword ? 'fa fa-eye' : 'far fa-eye-slash'}></i>
                        </span>
                        
                    </div>
                    
                    <div class="form-check">
                        <label class="form-check-label">
                        <input class="form-check-input" type="checkbox"/> Remember me
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary"
                    onClick={()=> {this.handleLogin()}}
                    >Login</button>
                    <div class="mess" style={{color:'red'}} >
                    {this.state.errMessage}
                    </div>
                    
               </div> */}
               <div className= {this.state.signIn ? 'container' : 'container right-panel-active'} id="container">
                    <div className="form-container sign-up-container">
                        <form action="#">
                            <h1>Create Account</h1>
                            <div class="social-container">
                                <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                                <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your email for registration</span>
                            <input 
                                type="email" 
                                placeholder="Email"
                                id="email"
                                value={this.state.username}
                                onChange={(event)=> this.handleOnChangeUsername(event)} 
                                />
                            <input 
                                type="text" 
                                id="firstname"
                                value={this.state.firstname}
                                onChange={(event)=> this.handleOnChangeFirstName(event)} 
                                placeholder="First Name" 
                                />
                            <input 
                                type="text" 
                                id="lastname"
                                value={this.state.lastname}
                                onChange={(event)=> this.handleOnChangeLastName(event)} 
                                placeholder="Last Name" 
                                />
                            <input 
                                type={this.state.isShowPassword ? 'text' : 'password'}
                                id="pwd"
                                onChange={(event)=> this.handleOnChangePassword(event)}
                                onKeyDown = {(event) => this.handleKeyDown(event)} 
                                />
                            <button
                                type='submit'
                                onClick={()=> {this.handleRegister()}}
                            >   Sign Up
                            </button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form action="#">
                            <h1>Sign in</h1>
                            <div class="social-container">
                                <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                                <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your account</span>
                            <input 
                                type="email" 
                                placeholder="Email"
                                id="email"
                                value={this.state.username}
                                onChange={(event)=> this.handleOnChangeUsername(event)}
                            />
                            <input 
                                placeholder="Password"
                                type={this.state.isShowPassword ? 'text' : 'password'}
                                id="pwd"
                                onChange={(event)=> this.handleOnChangePassword(event)}
                                onKeyDown = {(event) => this.handleKeyDown(event)}
                            />
                            <span onClick={() => {this.handleShowHidePassword()}}>
                            
                                <i class={this.state.isShowPassword ? 'fa fa-eye' : 'far fa-eye-slash'}></i>
                            </span>
                            <a href="#">Forgot your password?</a>
                            <button
                                type='submit'
                                onClick={()=> {this.handleLogin()}}
                            >Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button 
                                    className="ghost"  
                                    id="signIn"
                                    onClick={() => {this.signInButton()}}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button 
                                    className="ghost" 
                                    id="signUp"
                                    onClick={() => {this.signInButton()}}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);