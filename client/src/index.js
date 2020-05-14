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
import Discogs from './components/discogs'
import Users from './components/users'


//function for routes to get specific path
function Routing() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/users">View Students</Link>           
          </li>
          <li>
            <Link to="/qus-list">View All QuestionsList</Link>
          </li>
          <li>
            <Link to="/search">Add Question</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/">
           <div>
             <img className="back" alt="background"src="background.jpg"/>
           </div>
          </Route>
          <Route path="/users">
              <Users/>
          </Route>
          <Route path="/qus-list">
              <Quslist/>
          </Route>
          <Route path="/search">
              <Discogs/>
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
