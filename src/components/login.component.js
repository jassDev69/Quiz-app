import React, { Component } from "react";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {emailId: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({emailId: event.target.emailId});
    }

    handleSubmit(event) {
        alert('All data was submitted: ' + this.state.emailId);
        event.preventDefault();
    }
    componentDidMount() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailId:'' })
        };
        fetch('https://backend-quiz.herokuapp.com/api/user/login', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
    }
    render() {
        return (
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input value={this.state.emailId} type="email" id="emailId" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={this.componentDidMount()}>Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}
