import React, { Component } from "react";
import "./index.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ViewAllPackages from "./components/ViewAllPackages"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { PackageContinent } from "./components/PackageContinent";
import {Book} from './components/Book';
import { ViewAllBooks } from "./components/ViewAllBooks";
import ItineraryViewer from "./components/ItineraryViewer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_userId: sessionStorage.getItem("userId"),
      logged_userName: sessionStorage.getItem("userName"),
      dialog_visible: false,
      logged_out: false
    };
  }

  onClick = () => {
    this.setState({ dialog_visible: true });
  };

  onHide = () => {
    this.setState({ dialog_visible: false });
  };

  logout = () => {
   
      
    this.setState({ dialog_visible: false });
    sessionStorage.clear();
    this.setState({ logged_out: true });
    window.location.href="http://localhost:3000/login";
    //window.location.reload()

   alert("You have been successfully Logged Out") ;}
  

  confirm_logout = () => {
    this.setState({ dialog_visible: true });
  };

  render() {
    return (
      <div>
        <Router>
          {/* <div className="container-fluid"> */}
          <div className="App">
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
              <div className="navbar-header">
                <Link className="navbar-brand zoom" to="/">
                  Start Travelling
                </Link>
              </div>
              <ul className="navbar-nav ml-auto">
                {this.state.logged_userId ? (
                  <li className="nav-item">
                    <Link className="nav-link zoom" to="">
                      Welcome {this.state.logged_userName}
                    </Link>
                  </li>
                ) : null}
                <li className="nav-item">
                  <Link className="nav-link zoom" to="/packages">
                    Hot Deals{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link zoom" to="/viewBookings">
                    Planned Trips
                  </Link>
                </li>

                {!this.state.logged_userId ? (
                  <li className="nav-item">
                    <Link className="nav-link zoom" to="/login">
                      {" "}
                      Login
                    </Link>
                  </li>
                ) : null}
                {this.state.logged_userId ? (
                  <li className="nav-item">
                    {/* <Link className="nav-link" onClick={this.logout} to=""> */}
                       <Link className="nav-link zoom"  data-toggle="modal" data-target={"#B"}>Log out</Link>
                            <div className="modal fade" id={"B"} tabIndex="-1" aria-labelledby={"B" +"Label"} ari-hidden="true">
                                <div className="modal-dialog modal-lg modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="text-dark" id={"B" + "label"} >Log Out</h5>
                                            <button type="button" id="accordButton1" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">-</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <p className="text-secondary"><em>Are you sure you want to Log Out?</em></p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn  btn-danger" data-dimiss="modal" onClick={this.logout} to="">Log out</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    {/* <Link className="nav-link zoom" onClick={this.logout} to=""> */}
                      {" "}
                      
                    {/* </Link> */}
                  </li>
                ) : null}
              </ul>
            </nav>

            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/packages" component={ViewAllPackages}></Route>
              <Route exact path="/itinerary/:destinationId" component={ItineraryViewer}></Route>
              <Route exact path="/book/:destinationId" component={Book}></Route>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/viewPackages/:continent" component={PackageContinent}></Route>
              <Route exact path="/viewBookings" component={ViewAllBooks}></Route>

          
              {/* Implement route path here */}
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;