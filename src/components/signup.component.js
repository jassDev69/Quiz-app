import React, { Component } from "react";
import {Redirect} from 'react-router-dom'

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            redirect : false
        };
        localStorage.setItem('loggedIn', false);
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

        if (!fields["firstName"]) {
          formIsValid = false;
          errors["firstName"] = "*Please enter your first name.";
        }   

        if (!fields["lastName"]) {
            formIsValid = false;
            errors["lastName"] = "*Please enter your last name.";
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
    signUp = (e) =>  {
        e.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            fields["firstName"] = "";
            fields["lastName"] = "";
            fields["emailid"] = "";
            fields["password"] = "";
            this.setState({fields:fields});
                
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName:this.state.fields.firstName, lastName:this.state.fields.lastName,emailId:this.state.fields.emailid,password:this.state.fields.password })
        };
        fetch('https://backend-quiz.herokuapp.com/api/user/signup', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === 200){
                    alert(data.message);
                    localStorage.setItem('loggedData', JSON.stringify(data.data));
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
            <form onSubmit={this.signUp}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>                 
                    <input type="text" name="firstName" value={this.state.fields.firstName ||''} onChange={this.handleChange}  className="form-control" placeholder="First name" />
                    <div className="errorMsg">{this.state.errors.firstName}</div>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input  name="lastName" value={this.state.fields.lastName ||''} onChange={this.handleChange} type="text" className="form-control" placeholder="Last name" />
                    <div className="errorMsg">{this.state.errors.lastName}</div>
                </div>
            
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
                {/* onClick={this.componentDidMountsas()} */}
                <button type="submit"  className="btn btn-primary btn-block">Sign Up</button>
                {/* <p className="forgot-password text-right">
                    Already registered <a>sign in?</a>
                </p> */}
            </form>
        );
    }
}