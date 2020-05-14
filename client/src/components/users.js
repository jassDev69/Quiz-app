import React from 'react';

const result = [{id:'' , Firstname:'Jaspreet' , Lastname:'Singh' , username:'jassi619'},
                {id:'' , Firstname:'Jaskaran' , Lastname:'Singh' , username:'jaskaran10'}
                ]


export default  class Users extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userData: []
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
        
        <div className="search">
              <h1>User List</h1>
              {console.log(result)}
          {/* if their is no data */}
           {this.state.userData.length===0 &&
               <h3>Sorry, No User list till now :(</h3>
            }  
          {/* if their is data */}
          {this.state.userData.length>0 &&
              <h2>Total record : {this.state.userData.length}</h2>
          }  
            {result.length>0 &&
            <table>
              
              <thead>
              <tr>
                <td>Id</td>
                <td>Firstname</td>
                <td>Lastname</td>
                <td>Username</td>
                <td>Actions</td>            
              </tr>
              </thead>
              <tbody>
              {result.map((item,i) => (
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.Firstname}</td>
                <td>{item.Lastname}</td>
                <td>{item.username}</td>
                <td>
                  <button className="btn" type="button" onClick={()=>{this.deleteUser(item.id)}}>DELETE</button>
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
  