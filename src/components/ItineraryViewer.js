import React, { Component } from "react";
import axios from "axios";
// import { backendUrlHotDeal } from "react";
import { Link,} from "react-router-dom";
import { backendUrlItinerary } from "../BackendURL";


export class ItineraryViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinations: [],
      details: [],
      itineraryButton: false,
      bookButton: false,
      overviewButton: false,
      errorMessage: "",
      itinerary: [],
      destForPackage: "",
      destForBook: "",
      bookme: false,
      d: [],
    };
  }
  componentDidMount() {
    //Implement this function to fetch package details by continent from the backend
    console.log(this.props.match.params.destinationId);
    this.setState({ overviewButton: true });
    axios
      .get(backendUrlItinerary +"/"+ this.props.match.params.destinationId)
      .then((response) => {
        console.log(this.props.match.params.destinationId)
        this.setState({ destinations: response.data });
        this.setState({ details: this.state.destinations.details });
        this.setState({ itinerary: this.state.details.itinerary });
      })
      .catch((e) => {
        this.setState({
          errorMessage: "Sorry we don't operate in this Destination",
        });
      });
  }

  createCard = () => {
    

   return (
      <>
      <div className="row">
        <div className="card  " style={{ marginTop: -50 }}>
          <div className="card-header">
            <h2>Overview </h2>
            <span
              className="icon text-success"
              style={{ padding: "10px 10px" }}
            >
            
            </span>
          </div>
          <div className="card-body">
            <p className="text-primary">
              <h4>About:</h4>
            </p>
            <span>{this.state.details.about}</span><br /><br />
            <p className="text-primary">
              <h4>Package Inclusion:</h4>
            </p>
            <span style={{ color: "#0b0d0c" }}>
              {" "}
              {this.state.details.packageInclusion}
            </span><br /><br />
            <p className="text-primary">
              <h4>HighLights:</h4>
            </p>
            <span> {this.state.details.highlights} </span><br /><br />
            <p className="text-primary">
              <h4>Pace: </h4>
            </p>
            {this.state.details.pace}
          </div>
        </div>
        </div>
      </>
    );
  };

  createItinerary = () => {
    return (
      <>
        <div className="card" style={{ margin: 20 }}>
          <div className="card-header">
            <h2>Itinerary</h2>
          </div>
          <div className="card-body">
            <p>
              <h4 className="text-primary">First Day:</h4>
              <span
                className="icon text-success">
               
              </span>
              
              {this.state.itinerary.firstDay}
            </p>
            <p>
              <h4 className="text-primary">Rest of The Day:</h4>
              <span
                className="icon text-success"
              >
                {/* <i className="pi pi-check"></i> */}
              </span>
              {this.state.itinerary.restOfDays}
            </p>
            <p>
              <h4 className="text-primary">Last Day:</h4>
              <span
                className="icon text-success"
              >
                {/* <i className="pi pi-check"></i> */}
              </span>
              {this.state.itinerary.lastDay}
            </p>
          </div>
          <div className="card-footer">
            &nbsp;
          </div>
        </div>
      </>
    );
  };
  createBook = () => {
    let d = this.state.destinations.destinationId;

    return (
      <>
      {console.log("hello")}
        <div className="card" style={{ margin: 20 }}>
          <div className="card-header">
            <h2>Lets Fly Together</h2>
          </div>
          <div className="card-body">
            <p>Continent :- &nbsp;{this.state.destinations.continent}</p>
            <p>Destination Name: - &nbsp;{this.state.destinations.destinationName}</p>
            <p>No of Nights :- &nbsp;{this.state.destinations.noOfNights}</p>
            <p>Flight Charge:- &nbsp;{this.state.destinations.flightCharge}</p>
            <p>Charges per person:- &nbsp;{this.state.destinations.chargePerPerson}</p>
            <p>Discount :- &nbsp;{this.state.destinations.discount}</p>
            <p>Availability :- &nbsp;{this.state.destinations.availability}</p>

          </div>
          <div className="card-footer">
            <Link className="btn btn-primary" to={"/book/"+d} >Book</Link>


          </div>
        </div>
      </>
    );
  };
  handleIteniry = () => {
    this.setState({
      itineraryButton: true,
      bookButton: false,
      overviewButton: false,
    });
  };
  handleBook = () => {
    this.setState({
      bookButton: true,
      overviewButton: false,
      itineraryButton: false,
    });
  };
  handleOverview = () => {
    this.setState({
      overviewButton: true,
      itineraryButton: false,
      bookButton: false,
    });
  };
  render() {

    console.log(sessionStorage.getItem("userId"));
    let sidebar = {
      background: "#343a40",
      position: "fixed",
      left: 0,
      height: "100vh",
      padding: "20px 0px",
      transition: "all 0.5 ease",
      zIndex: 99,
      top: "56px",
      width: "311px",
    };
    let list = {
      display: "block",
      padding: "13px 30px",
      borderBottom: "1px solid #10558d",
      color: "white ",
      fontSize: "16px",
      position: "relative",
    };
    //Write logic to display package details
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="wrapper">
                <div className="sidebar" style={sidebar}>
                  <ul style={{ listStyle: "none" }}>
                    <li>
                      <a
                        to="/"
                        className="active"
                        style={list}
                        onClick={this.handleOverview}
                      >
                        <span className="icon" style={{ padding: "10px 10px" }}>
                          <i className="pi pi-list"></i>
                        </span>
                        <span className="item" >
                            <b>Overview</b></span>
                      </a>
                    </li>
                    <li>
                      <a to="/" style={list} onClick={this.handleIteniry}>
                        <span className="icon" style={{ padding: "10px 10px" }}>
                          <i className="pi pi-map-marker"></i>
                        </span>
                        <span className="item">
                            <b>Itinerary</b></span>
                      </a>
                    </li>
                    <li>
                      <a to="/" style={list} onClick={this.handleBook}>
                        <span className="icon" style={{ padding: "10px 10px" }}>
                          <i className="pi pi-calendar"></i>
                        </span>
                        <span className="item">
                            <b>Book</b></span>
                      </a>
                    </li>
                  </ul>
                  <p
                    style={{
                      color: "#fff",
                      position: "relative",
                      top: "280px",
                      left: "64px",
                    }}
                  >
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-md-9"
              style={{
                position: "relative",
                top: "55px",
              }}
            >
              <div className="row">
                {this.state.itineraryButton ? this.createItinerary() : null}
                {this.state.overviewButton ? this.createCard() : null}
                {this.state.bookButton ? this.createBook() : null}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ItineraryViewer;