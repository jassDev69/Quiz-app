import React from 'react';




export default  class Users extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userData: []
      };
    }
         
  //calling the api to get favourite list data
    componentDidMount() {
      const url = 'https://backend-quiz.herokuapp.com/api/admin/allUsers'
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
    deleteUser(id) {
      const url = 'https://backend-quiz.herokuapp.com/api/admin/user/'+id
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
          {/* if their is no data */}
           {this.state.userData.length===0 &&
               <h3>Sorry, No User list till now :(</h3>
            }  
          {/* if their is data */}
          {this.state.userData.length>0 &&
              <h2>Total record : {this.state.userData.length}</h2>
          }  
            {this.state.userData.length>0 &&
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
              {this.state.userData.map((item,i) => (
                <tr key={item.id}>
                <td>{i+1}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name || 'NA'}</td>
                <td>{item.email_id}</td>
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
  