import React from 'react';

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
        correctans : '',
        showElement : false,
      };
    }
  // when add button is clicked
    addToFav(){
      let insertData = {
          qus : this.state.qus,
          option1 : this.state.opt1,
          option2 : this.state.opt2,
          option3 : this.state.opt3,
          option4: this.state.opt4,
          correctans: this.state.correctans
        }
        console.log(insertData)
      const url = 'http://localhost:3001/api/tracks'
      fetch(url,{
        method: 'POST',
        body: JSON.stringify(insertData),
        headers: {
            'Content-Type': 'application/json'
        }
      })
    }

    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (      
        <div className="search">

      <table>
              <thead>
              <tr>
                <td>Question</td>
                <td>Options</td>
                <td>Correct answer</td>
              </tr>
              </thead>
              <tbody>
                <td><textarea rows="10" cols="50" name="qus" value={this.state.qus} placeholder="Question" onChange={ this.handleChange } /></td>
                <td><input type="text" name="opt1" value={this.state.opt1} onChange={ this.handleChange } placeholder="Option 1" />
                    <input type="text" name="opt2" value={this.state.opt2} onChange={ this.handleChange } placeholder="Option 2" />
                    <input type="text" name="opt3" value={this.state.opt3} onChange={ this.handleChange } placeholder="Option 3" />
                    <input type="text" name="opt4" value={this.state.opt4} onChange={ this.handleChange } placeholder="Option 4" />
                </td>
                <td><input type="text" name="correctans" value={this.state.correctans} onChange={ this.handleChange } placeholder="Correct answer" /></td>
              </tbody>

                  <button className="btn" type="button" onClick={()=>{this.addToFav()}}>Post Question</button>
            </table>
          </div>
        );
    }
  }
  