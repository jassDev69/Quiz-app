import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Quslist from './components/quslist'
import Addquestion from './components/addquestion'
import Users from './components/users'
 import Studentqus from './components/studentqus'


//function for routes to get specific path
function Routing() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/users">User List</Link>           
          </li>
          <li>
            <Link to="/questions">Question List</Link>
          </li>
          <li>
            <Link to="/add-question">Add Question</Link>
          </li>
          <li>
            <Link to="/quiz">Quiz</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/">
           <div>
             <img className="back" alt="background"src="background.png" height="700px"/>
           </div>
          </Route>
          <Route path="/users">
              <Users/>
          </Route>
          <Route path="/questions">
              <Quslist/>
          </Route>
          <Route path="/add-question">
              <Addquestion/>
          </Route>
          <Route path="/quiz">
              <Studentqus/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


ReactDOM.render(
  <Routing/>,
  document.getElementById('root')
);
