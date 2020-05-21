/* eslint-disable react/no-direct-mutation-state */
import React from 'react';

// const result = [{qusname:'what is you firstname' , option:'jassi,jaskaran,karan,prabh' , correct:'jassi'},
//                 {qusname:'what is you lastname' , option:'singh,kaur,lake,wheat' , correct:'singh'}
//                 ]

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
      // eslint-disable-next-line no-lone-blocks
      this.state.len+=1
      this.forceUpdate()
    }

    calloptions()
    {
      this.state.option = this.state.userData[this.state.len].options.split(",")
    }

    render() {
      // eslint-disable-next-line no-lone-blocks
      // {this.state.userData.map((item,i) => (this.state.option = item.options.split(",")))}
        return (     
        <div>
          <h1>Quiz</h1>
            {this.state.len < this.state.userData.length &&
                <div>
                    {this.calloptions()}
                    <h1>{this.state.userData[this.state.len].question_text}</h1>
                                                    
                    {this.state.option.map((opt,key) =>(
                      <div>
                        <input type="radio" name="qus" value={opt} /> {opt}
                      </div>
                    ))}

                    <button className="btn" type="button" onClick={()=>{this.nextQuestion()}}>next</button>
                </div>
            }
        </div>
        );
    }
  }
  