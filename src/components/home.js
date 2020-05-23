import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect : false,
            loggedData : JSON.parse(localStorage.getItem('loggedData'))
            };
           
    }
    // componentDidMount() {
    //     // const loggedData = JSON.parse(localStorage.getItem('loggedData'));
    //     this.setState({ loggedData:JSON.parse(localStorage.getItem('loggedData'))});
    //     console.log(this.state.loggedData)
    // }
    
    beginQuiz =(e)=>{
        this.setState({
            redirect: true
          });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/begin' />
          }
        return (
            <div>   
            <p>Welcome {this.state.loggedData[0].first_name} {this.state.loggedData[0].last_name} </p>      
            <button type="button" onClick={this.beginQuiz} className="btn btn-primary btn-block" >BEGIN QUIZ</button>
            </div>
        );
    }
}