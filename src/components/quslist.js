import React from 'react';

// const result = [{qusname:'what is you firstname' , options:'jassi,jaskaran,karan,prabh' , correct:'jassi'},
//                 {qusname:'what is you lastname' , options:'singh,kaur,kamal,shubh' , correct:'singh'}
//                 ]


export default  class Quslist extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userData: [],
        option : ""
      };
    }
         
  //calling the api to get favourite list data
    componentDidMount() {
      const url = 'https://backend-quiz.herokuapp.com/api/admin/questions'
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

    deletequs(id) {
      const url = 'https://backend-quiz.herokuapp.com/api/admin/questions/'+id
      fetch(url,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            this.componentDidMount()
          },
        )
    }

    calloptions(index)
    {
      this.state.option = this.state.userData[index].options.split(",")
    }

    render() {
      // {this.state.userData.map((item,i) => (this.state.option = item.options.split(",")))}
        return (     
        
        <div className="search_quslist">
          {console.log(this.state.option)}
              <h1>Questions List</h1>
          {/* if their is no data */}
           {this.state.userData.length===0 &&
               <h3>Sorry, No Questions till now :(</h3>
            }  
          {/* if their is data */}
          {this.state.userData.length>0 &&
              <h2>Total record : {this.state.userData.length}</h2>
          }  

          

            {this.state.userData.length>0 &&
            <table>
              
              <thead>
              <tr>
                <td>Sr. No</td>
                <td>Question</td>
                <td>Options</td>
                <td>Correct</td>            
                <td>Actions</td>            
              </tr>
              </thead>
              <tbody>
              {this.state.userData.map((item,i) => (
                <tr key={item.id}>
                <td>{i+1}</td>
                <td>{item.question_text}</td>
                <td>
                  {this.calloptions(i)}
                  {this.state.option.map((opt,key) =>(
                    opt===item.correct_option ? <div className="correct opt-value">{opt}</div> : <div className="wrong opt-value">{opt}</div>
                  ))}
                </td>
                <td>{item.correct_option}</td>
                <td>
                  <button className="btn" type="button" onClick={()=>{this.deletequs(item.id)}}>DELETE</button>
                </td>
                </tr>
                
              ))}
              </tbody>
            </table>
            }
          </div>
        );
    }
  }
  