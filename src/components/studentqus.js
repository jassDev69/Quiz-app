import React from 'react';

const result = [{qusname:'what is you firstname' , option:'jassi,jaskaran,karan,prabh' , correct:'jassi'},
                {qusname:'what is you lastname' , option:'singh,kaur,lake,wheat' , correct:'singh'}
                ]

export default  class Studentqus extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userData: [],
        len : 0 ,
        option : ""
      };
    }
         
  //calling the api to get favourite list data
    componentDidMount() {
      const url = 'https://backend-quiz.herokuapp.com/api/user/questions'
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
      this.setstate.len+=1
      this.forceUpdate()
    }

    render() {
      {this.state.userData.map((item,i) => (this.state.option = item.options.split(",")))}
        return (     
        <div>
            <h1>Quiz</h1>
            {this.state.len < result.length &&
                <div>
                    <h1>{result[this.state.len].qusname}</h1>                   
                    {this.state.option.map((opt,key) =>(
                      <div>
                        <input type="radio" name="qus" value={opt} /> {opt}
                      </div>
                    ))}
                    <button className="btn" type="button" onClick={()=>{this.nextQuestion()}}>next</button>
                </div>
            }
            {this.state.len >= result.length && <h3>Quiz is finish :(</h3>}
          </div>
        );
    }
  }
  