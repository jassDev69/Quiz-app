import React from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from "react-router-dom";

toast.configure({
  autoClose: 2000,
  draggable: false,
});

export default class Addquestion extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userData: [],
        qus : '',
        opt1 : '',
        opt2 : '',
        opt3 : '',
        opt4 : '',
        flag : 0,
        showElement : false,
        redirect : false
      };
    }
    // ["india","uk"]

    // addToFav(){
    
    // }
    addToFav(){ 

      if(!this.state.qus){
        toast("Question can't be blank");
        return false;
      }    

      if(!this.state.opt1){
        toast("Option 1 can't be blank"); 
        return false;
      }

      if(!this.state.opt2){
      toast("Option 2 can't be blank");
      return false; 
      }

      if(!this.state.opt3){
      toast("Option 3 can't be blank");
      return false; 
      }

      if(!this.state.opt4){
        toast("Option 4 can't be blank");
        return false; 
      }

      if(!this.state.correctans){
        toast("Correct answer can't be blank");
        return false; 
      }

      if(this.state.correctans === this.state.opt1)
      this.setState.flag = 1;

      if (this.state.correctans === this.state.opt2)
      this.setState.flag = 1;

      if (this.state.correctans === this.state.opt3)
      this.setState.flag = 1;

      if (this.state.correctans === this.state.opt4 )
      this.setState.flag = 1;


// console.log(this.state.flag)
// console.log(this.state.opt1)
// console.log(this.state.correctans)

//        if(this.state.flag === 0)  {
//             toast("Correct answer doesn't match with the options");       
//         }else{  
              let insertData = {
              question_text : this.state.qus,
              options : this.state.opt1+","+this.state.opt2+","+this.state.opt3+","+this.state.opt4 ,
              correct_option: this.state.correctans
              }
            const url = 'https://backend-quiz.herokuapp.com/api/admin/postQuestion'
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
                  console.log(this.state.redirect)
                  this.setState({
                    redirect: true
                  });
                // toast(result.message);           
                },
              )
        // }
    }
    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

    render() {
      console.log(this.state.redirect)
      if (this.state.redirect) {
        return <Redirect to='/questions' />
      }
      if (!this.state.redirect) {
        return (      
        <div className="search">
        <form>
      <table>
              <thead>
                <tr>
                  <td>Question</td>
                  <td>Options</td>
                  <td>Correct answer</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><textarea rows="10" cols="50" name="qus" value={this.state.qus} placeholder="Question" onChange={ this.handleChange } required/></td>
                  <td><input type="text" name="opt1" value={this.state.opt1} onChange={ this.handleChange } placeholder="Option 1" required />
                      <input type="text" name="opt2" value={this.state.opt2} onChange={ this.handleChange } placeholder="Option 2" required />
                      <input type="text" name="opt3" value={this.state.opt3} onChange={ this.handleChange } placeholder="Option 3" required/>
                      <input type="text" name="opt4" value={this.state.opt4} onChange={ this.handleChange } placeholder="Option 4" required/>
                  </td>
                  <td><input type="text" name="correctans" value={this.state.correctans} onChange={ this.handleChange } placeholder="Correct answer"required /></td>
                </tr>
              </tbody>                         
            </table>
            <button className="btn" type="button" onClick={()=>{this.addToFav()}}>Post Question</button>       
            </form>
          </div>
        );
      }
    }
  }
  