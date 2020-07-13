import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './app.scss';
import { Googlebooks } from '@exercise/googlebooks';
import { Weather } from '@exercise/weather';
export const App:React.FC = () => (
  <BrowserRouter>
    <div className="app">
      
     {/*  navigation bar */}
      <nav className="app-nav">
        <ul>
          <li>
            <Link to="/books">Books</Link>
           
          </li>
          <li>
          <Link to="/weather">Weather</Link>
          </li>
        </ul>
      </nav>

      {/* routes: */}
      <div className="app-content">
        <Route path="/books" exact component={Googlebooks} />
        <Route path="/weather" exact component={Weather} />
      </div>
    </div>
  </BrowserRouter>
);

export default App;
