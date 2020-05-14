import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure({
  autoClose: 1000,
  draggable: false,
});
export default class Discogs extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userData: [],
        searchText : '',
        showElement : false,
        discogs:{
          Key : 'YqLqSXfIBtRptZLpBkAb',
          Secret : 'MKkCBcUROyiHDGQrKGJtxmMiGRFWeESn'
        }
      };
    }
  // when add button is clicked
    addToFav(data){
      let insertData = {
          id : data.id,
          playlist_id : data.genre[0],
          title : data.title,
          uri : data.uri,
          master_id: data.master_id,
          img_url: data.thumb
        }
      const url = 'http://localhost:3001/api/tracks'
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
            toast(result);           
          },
        )
    }
    //when search button is clicked
    search(){
      const url = 'https://api.discogs.com/database/search?key='+this.state.discogs.Key+'&secret='+this.state.discogs.Secret+'&artist=%22'+this.state.searchText+'%22&country=canada%22'
      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              userData: result.results,
              showElement : true,
            });
          },
        )
    }
    //when we type something in text box, the value is saved in the variable name 'searchText'
    handleChange = (e) => {
      this.setState({ searchText: e.target.value });
    }
    render() {
        return (      
        <div className="search">
           <input type="text" value={this.state.searchText} onChange={ this.handleChange } placeholder="search by artist..."/>
          <button className="btn" type="button" onClick={()=>{this.search()}}>search</button>
        
          {this.state.userData.length>0 && 
            <h2>Total record searched : {this.state.userData.length}</h2>
          }       
            {this.state.userData.length===0 && this.state.showElement &&
               <h3>Sorry, No record found :(</h3>
            }  

          {this.state.userData.length>0 &&
           <table>
              <thead>
              <tr>
                <td>Sr. No</td>
                <td>ID</td>
                <td>Image</td>
                <td>Title</td>
                <td>Genre</td>
                <td>Year</td>
                <td>Actions</td>
              </tr>
              </thead>
              <tbody>
              {this.state.userData.map((item,i) => (
                <tr key={item.id}>
                <td>{i+1}</td>
                <td>{item.id}</td>
                <td> <img src={item.thumb} alt="cover"/></td>
                <td>{item.title}</td>
                <td>{item.genre[0] || 'NA'}</td>
                <td>{item.year || 'NA'}</td>
                <td>
                  <button className="btn" type="button" onClick={()=>{this.addToFav(item)}}>Add</button>
                  <a href={'http://www.discogs.com/'+item.uri}>More Information</a>
                </td>
                </tr>
              ))}
              </tbody>
            </table>
            }
             <ToastContainer />
          </div>
        );
    }
  }
  