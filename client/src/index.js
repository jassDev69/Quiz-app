import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Playlist from './components/playList'
import Discogs from './components/discogs'

function Routing() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Add Question</Link>           
          </li>
          <li>
            <Link to="/favourite-list">View List</Link>
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
          <Route path="/favourite-list">
              <Playlist/>
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
