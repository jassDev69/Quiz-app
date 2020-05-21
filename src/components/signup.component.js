import React, { Component } from "react";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {firstName: '',lastName: '',emailId:'',password:''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value:event.target.firstName});
        this.setState({value:event.target.lastName});
        this.setState({value:event.target.emailId});
        this.setState({value:event.target.password});
    }

    handleSubmit(event) {
        alert('All data was submitted : ' + this.state.firstName + this.state.lastName + this.state.emailId + this.state.password);
        event.preventDefault();
    }
    //
    componentDidMount() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName:'', lastName:'',emailId:'',password:'' })
        };
        fetch('https://backend-quiz.herokuapp.com/api/user/signup', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
    }

    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input value={this.state.firstName} id="firstName" type="text" className="form-control" placeholder="First name" required />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input  value={this.state.lastName} id="lastName" type="text" className="form-control" placeholder="Last name" required />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input value={this.state.emailId} type="email" id="emailId" className="form-control" placeholder="Enter email" required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input value={this.state.password} type="password" id="password" className="form-control" placeholder="Enter password" required />
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={this.componentDidMount()}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
        );
    }
}