import React, { Component } from "react";
export default class Score extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect : false,
            userData : "",
            loggedData : JSON.parse(localStorage.getItem('loggedData'))
            }; 
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id:this.state.loggedData[0].id})
            };
            fetch('https://backend-quiz.herokuapp.com/api/user/scores', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if(data.status === 200){                 
                        this.setState({
                            userData: data.data[0].sum
                          });
                    }
                });
    }

    render() {
        
        return (
            <h2>Your Score is  : {this.state.userData || 0} </h2>      
          
        );
    }
}