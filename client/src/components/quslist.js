import React from 'react';

const result = [{qusname:'what is you firstname' , options:'jassi,jaskaran,karan,prabh' , correct:'jassi'},
                {qusname:'what is you lastname' , options:'singh,kaur,kamal,shubh' , correct:'singh'}
                ]


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
      //const url = 'http://localhost:3001/api/adminquestions'
      // fetch(result)
      //   .then(res => res.json())
      //   .then(
      //     (result) => {
      //       this.setState({
      //         userData: result
      //       });
      //     },
      //   )   
    }
    //delete from favourites
    deleteUser(id) {
      const url = 'http://localhost:3001/api/tracks/'+id
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
              {console.log(result)}
          {/* if their is no data */}
           {this.state.userData.length===0 &&
               <h3>Sorry, No favourite list till now :(</h3>
            }  
          {/* if their is data */}
          {this.state.userData.length>0 &&
              <h2>Total record : {this.state.userData.length}</h2>
          }  

          {result.map((item,i) => (this.state.option = item.options.split(",")))}

            {result.length>0 &&
            <table>
              
              <thead>
              <tr>
                <td>Sr. No</td>
                <td>Question</td>
                <td>Options</td>
                <td>Correct</td>            
              </tr>
              </thead>
              <tbody>
              {result.map((item,i) => (
                <tr key={item.id}>
                <td>{i+1}</td>
                <td>{item.qusname}</td>
                <td>1.{this.state.option[0]+" "}  
                    2.{this.state.option[1]+" "} 
                    3.{this.state.option[2]+" "} 
                    4.{this.state.option[3]+" "}
                </td>
                <td>{item.correct}</td>
                </tr>
                
              ))}
              </tbody>
            </table>
            }
          </div>
        );
    }
  }
  