import React, { useCallback } from 'react';

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
      const url = 'http://localhost:3002/api/admin/questions'
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
    //delete from favourites
    deletequs(id) {
      const url = 'http://localhost:3002/api/admin/questions/'+id
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
    render() {
        return (     
        
        <div className="search_quslist">
              <h1>Questions List</h1>
          {/* if their is no data */}
           {this.state.userData.length===0 &&
               <h3>Sorry, No Questions till now :(</h3>
            }  
          {/* if their is data */}
          {this.state.userData.length>0 &&
              <h2>Total record : {this.state.userData.length}</h2>
          }  

          {this.state.userData.map((item,i) => (this.state.option = item.options.split(",")))}

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
                <td>1.{this.state.option[0]+" "}  
                    2.{this.state.option[1]+" "} 
                    3.{this.state.option[2]+" "} 
                    4.{this.state.option[3]+" "}
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
  