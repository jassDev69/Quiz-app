import React from 'react';

const result = [{qusname:'what is you firstname' , option:'jassi,jaskaran,karan,prabh' , correct:'jassi'},
                {qusname:'what is you lastname' , option:'singh,kaur,lake,wheat' , correct:'singh'}
                ]

export default  class Studentqus extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userData: [],
        length : 0,
        opt : ""
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
      this.setstate.length+=1
      this.forceUpdate()
    }
    render() {
        return (
          
        <div>
          {result.map((item,i) => (this.state.opt = item.option.split(",")))}
          {console.log("54"+this.state.option)}
            <h1>Quiz</h1>
            {this.state.length < result.length &&
                <div>
                    <h1>{result[this.state.length].qusname}</h1>
                    {this.state.option.map((item) => (
                       <input type="radio" name="question" value={item} />
                    ))}
                    <button className="btn" type="button" onClick={()=>{this.nextQuestion()}}>next</button>
                </div>
            }
          </div>
        );
    }
  }
  