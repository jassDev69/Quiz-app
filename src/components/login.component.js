import React, { Component,useContext  } from "react";
import {Redirect} from 'react-router-dom'
import UserContext from './userContext'
// import { Consumer } from "./GreetContext";
export default class Login extends Component {
     static contextType = UserContext
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            user: {},
            redirect : false,
        };
        // localStorage.setItem('loggedIn', false);
    }
    componentDidMount() {
        const user = this.context

        console.log(user);
      }
    handleChange =(e)=>{
        // this.setState({ [e.target.name]: e.target.value });
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });
      }

      validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
      
  
        if (!fields["emailid"]) {
          formIsValid = false;
          errors["emailid"] = "*Please enter your email-ID.";
        }
  
        if (typeof fields["emailid"] !== "undefined") {
          //regular expression for email validation
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(fields["emailid"])) {
            formIsValid = false;
            errors["emailid"] = "*Please enter valid email-ID.";
          }
        }    

        if (!fields["password"]) {
          formIsValid = false;
          errors["password"] = "*Please enter your password.";
        }    

        this.setState({
          errors: errors
        });
        return formIsValid; 
      }

    login = (e) =>  {
        e.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            fields["emailid"] = "";
            fields["password"] = "";
            this.setState({fields:fields});
            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email:this.state.fields.emailid,password:this.state.fields.password })
            };

            fetch('https://backend-quiz.herokuapp.com/api/user/login', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if(data.status === 200){
                        alert(data.message);
                        localStorage.setItem('loggedData', JSON.stringify(data.data));
                        //  const newUser = {loggedIn: true }
                  
                        this.setState({
                            redirect: true
                          });
                    }else{
                        alert(data.message);
                    }
                  
                });
        }    
    }
    render() {
       
        if (this.state.redirect) {
            return <Redirect to='/home' />
          }
        return (
            <form onSubmit={this.login}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input name ="emailid" value={this.state.fields.emailid ||''} onChange={this.handleChange} type="email" className="form-control" placeholder="Enter email" />
                    <div className="errorMsg">{this.state.errors.emailid}</div>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={this.state.fields.password ||''} onChange={this.handleChange} className="form-control" placeholder="Enter password" />
                    <div className="errorMsg">{this.state.errors.password}</div>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" >Submit</button>
                {/* <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p> */}
            </form>
        );
    }
}
