import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/home";
import Todo from "./components/todo/todo";
function App() {
    return (
        <Router>
            <div className="App h-100">
            <div className="container-fluid h-100">
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/todo" component={Todo} exact/>
                </Switch>
            </div>

            </div>
        </Router>

    );
}

export default App;
