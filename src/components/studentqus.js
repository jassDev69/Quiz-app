import React from 'react';

const result = [{qusname:'what is you firstname' , option:'jassi,jaskaran,karan,prabh' , correct:'jassi'},
                {qusname:'what is you lastname' , option:'singh,kaur,lake,wheat' , correct:'singh'}
                ]

export default  class Studentqus extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userData: [],
        len : 0
      };
    }
         
  //calling the api to get favourite list data
    componentDidMount() {
      const url = 'http://localhost:3002/api/admin/allUsers'
      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              userData: result
            });
          },
        )   
    }
    nextQuestion()
    {
      this.state.len+=1
      this.forceUpdate()
    }

    render() {
        return (     
        <div>
            <h1>Quiz</h1>
            {this.state.len < result.length &&
                <div>
                    <h1>{result[this.state.len].qusname}</h1>
                    <button className="btn" type="button" onClick={()=>{this.nextQuestion()}}>next</button>
                </div>
            }
            {this.state.len >= result.length && <h3>Quiz is finish :(</h3>}
          </div>
        );
    }
  }
  