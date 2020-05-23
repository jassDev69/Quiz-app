/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import {Redirect} from 'react-router-dom'
// const result = [{qusname:'what is you firstname' , option:'jassi,jaskaran,karan,prabh' , correct:'jassi'},
//                 {qusname:'what is you lastname' , option:'singh,kaur,lake,wheat' , correct:'singh'}
//                 ]

export default  class Begin extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userData: [],
        len : 0 ,
        option : "" ,
        selectedoption : '',
        loggedData : JSON.parse(localStorage.getItem('loggedData')),
        redirect : false
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
    nextQuestion (e)
    {    
      let insertData = {
        optionSelected : this.state.selectedoption,
        selectedID : e,
        user_id : this.state.loggedData[0].id
        }
        const url = 'https://backend-quiz.herokuapp.com/api/user/submitQuestion'
        fetch(url,{
          method: 'POST',
          body: JSON.stringify(insertData),
          headers: {
              'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
          .then(
            (result) => {
             if(result.status ===200){
                 if(this.state.len < this.state.userData.length-1){
                    this.forceUpdate()
                    this.state.len+=1
                    this.setState({
                      selectedoption: ''
                    });
                 } else{
                    this.setState({
                        redirect: true
                      });
                 }         
             }
            },
          )
    }
    calloptions()
    {
      this.state.option = this.state.userData[this.state.len].options.split(",")
    }
   
    handleOptionChange = (changeEvent) => {
      this.setState({
        selectedoption: changeEvent.target.value
      });
    }
  
    render() {
      // eslint-disable-next-line no-lone-blocks
      // {this.state.userData.map((item,i) => (this.state.option = item.options.split(",")))}
      if (this.state.redirect) {
        return <Redirect to='/score' />
      }
        return (     
        <div>
            {this.state.userData.length===0 &&
               <h3>Sorry, No Questions posted yet :(</h3>
            }  
            {this.state.len < this.state.userData.length &&
                <div className="options">
                    {this.calloptions()}
                    <h2>{this.state.userData[this.state.len].question_text}</h2>
                                                    
                    {this.state.option.map((opt,key) =>(
                      <div key={key} >
                        <input type="radio" name={opt} value={opt} onChange={this.handleOptionChange} checked={opt ===this.state.selectedoption} /> {opt}
                      </div>
                    ))}

                  <button className="btn btn-primary btn-block" type="button" disabled={!this.state.selectedoption} onClick={()=>{this.nextQuestion(this.state.userData[this.state.len].id)}}> {this.state.len < this.state.userData.length-1 ? "Next" : "Finish"}</button>
                </div>
            }
        </div>
        );
    }
  }
  