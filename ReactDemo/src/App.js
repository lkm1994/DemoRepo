import React, { Component } from 'react';
import bg from './assets/images/b1.jpg';
import './App.css';
import AuthService from './components/services/AuthService'
// import { withRouter } from "react-router-dom";
// import FormErrors from './FormErrors.js'
class App extends Component {
  constructor() {
    super();
    this.enviornment = process.env.NODE_ENV;
    console.log(process.env.REACT_APP_DEV_API_URL);
    this.state = {
      welcome: 'Welcome to Rubix',
      username: '',
      password: '',
      formErrors: { username: '', password: '' },
      userNameValid: false,
      passwordValid: false,
      formValid: false
    }
    this.handleUserInput = this.handleUserInput.bind(this);
    this.Auth = new AuthService();
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let userNameValid = this.state.userNameValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'username':
        // emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        userNameValid = value.length > 0;
        fieldValidationErrors.username = userNameValid ? '' : 'Enter a Valid Username';
        break;
      case 'password':
        passwordValid = value.length >= 4;
        fieldValidationErrors.password = passwordValid ? '' : 'Password is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      userNameValid: userNameValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.userNameValid && this.state.passwordValid });
  }
  errorClass(error) {
    // console.log(error);
    return (error.length === 0 ? 'No Error' : 'has-error');
  }
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => { this.validateField(name, value) });
  }
  changeOnClick = () => {
    this.setState({
      welcome: 'Hi React'
    })
  }
  submitButton(event) {
    event.preventDefault();
    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        console.log(res);
        this.Auth.setToken(res.data.token, res.data.refreshToken);
        console.log(this.props);
        this.props.history.replace('/home');
      }).catch(error => {
        console.log(error);
      })
    /* .then(res => {
      this.props.history.replace('/home');
    })
    .catch(err => {
      alert(err);
    }); */
    // this.props.history.replace('/home');
  }
  componentWillMount() {
    if (this.Auth.loggedIn())
      this.props.history.replace('/home');
  }
  render() {
    return (
      <div className="App">
        <div className="background">
          <img src={bg} className="App-logo" alt="logo" />
        </div>
        <header className="App-header">
          <h1 className="App-title">{this.state.welcome}</h1>
        </header>
        <div className="card">
          <h2>Login</h2>
          <form>
            <div className={`form-group
                 ${this.errorClass(this.state.formErrors.username)}`} />
            <div className="panel panel-default">
              {/* <FormErrors formErrors={this.state.formErrors} /> */}
              <span className="error-class">{this.state.formErrors.username}</span>
            </div>
            <div className="form-group">
              <input className="form-control text-fields" name="username" id="username" type="text" onChange={(event) => this.handleUserInput(event)} required />
              <label className="form-control-placeholder" htmlFor="username">Username</label>
            </div>
            <div className="panel panel-default">
              {/* <FormErrors formErrors={this.state.formErrors} /> */}
              <span className="error-class">{this.state.formErrors.password}</span>
            </div>
            <div className="form-group">
              <input className="form-control text-fields" name="password" onChange={(event) => this.handleUserInput(event)} type="password" id="password" required />
              <label className="form-control-placeholder" htmlFor="password">Password</label>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-6 col-sm-6">
                <div className="row">
                  <span className="register">Register</span>
                </div>
                <div className="row">
                  <span className="remember-me">Remember Me</span>
                  <div className="switch">
                    <input id="cmn-toggle-4" name="rememberMe" className="cmn-toggle cmn-toggle-round-flat" type="checkbox" />
                    <label htmlFor="cmn-toggle-4"></label>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-6">
                <div className="row">
                  <span className="forgot"><a href="">Forgot Password?</a></span>
                </div>
                <div className="row">
                  <button className="btn btn-primary login-button" onClick={(event) => this.submitButton(event)} disabled={!this.state.formValid}>Login</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div >
    );
  }
}
export default App;
