import { Component } from 'react';
import axios from 'axios';
import { backendUrlDeleteBook, backendUrlViewBook } from '../BackendURL';
import { Redirect,Link } from 'react-router-dom';
import Axios from 'axios';

export class ViewAllBooks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            successMessage: "",
            errorMessage: "",
            bookings: [],
            userId: sessionStorage.getItem("userId"),
            userName: sessionStorage.getItem("userName"),
            hotDeal:false,
            refundAmount:"",
            bookLogged: true,
            bookDelete: false,
            bookingId:0,
            dem: ""
           
        }
        this.res = []
    }
    getBooking = () => {
        if (sessionStorage.getItem("userId") == null) {
            return this.MediaStreamAudioDestinationNode({ bookLogged: false })
        }
        let url = backendUrlViewBook + sessionStorage.getItem("userId")
        console.log(sessionStorage.getItem("userId"))
        axios.get(url).then(response => {
            this.MediaStreamAudioDestinationNode({ bookings: response.data })
        })
            .catch(error => {
                if (error.data) {
                    this.MediaStreamAudioDestinationNode({ errorMessage: error.response.data.errorMessage });
                    //console.log(error.response.data)
                } else {
                    this.MediaStreamAudioDestinationNode({ errorMessage: "Sorry, you have not planned any trip yet!!" });
                }
    
            })
    
    }


        cancelBooking=(event,totalCost)=>{
            Axios.delete(backendUrlDeleteBook+event)
            .then(response=>{})
            .catch(error=>{});
            sessionStorage.setItem("refundAmount",totalCost)
            window.location.reload();

        }
        

        //Implement this function to delete the booking.
    

    componentDidMount() {
        if (sessionStorage.getItem("userId") == null) {
            
            return this.setState({ bookLogged: false })
        }
        
        let url = backendUrlViewBook+ sessionStorage.getItem("userId")
        
        axios.get(url).then(response => {
            console.log(response.data)
            this.setState({ bookings: response.data })
        })
            .catch(error => {
                if (error.response) {
                    this.setState({ errorMessage: error.response.data.errorMessage });
                    console.log(error.response.data)
                } else {
                    this.setState({ errorMessage: "Please run the backend" })
                }
            })
    }

  

    render() {
        if (this.state.bookLogged === false) {
            alert("Please Login to view your plans")
            return <Redirect to={"/login"}></Redirect>
        }
       
    else 
   
     if (this.state.errorMessage !== "") {
            return <center><h3>Sorry!! You don't have any trips planned</h3><br/><br/>
            <Link className="btn btn-primary" to="/packages">Click Here to see Hot Deals</Link></center>
           
        }
    
    //Write the remaining logic
    //just for checking

    return (
        <div className="container-fluid allBg" style={{ "padding": "100px 10px 10px 10px" }}>
           
            {this.state.bookings.map(booking => (
                <div key={"B" + booking.bookingId}>
                    <div className="container rounded shadow-lg p-3 mb-5 bg-white rounded mx-auto" style={{ "padding": "70px 70px 70px 70px" }}>
                    <div className="row">
                        <div className="col-sm">
                                <img src={booking.destination.imageUrl}
                                className="rounded mx-auto d-block" alt="destination" style={{width:"400px","margin":"auto","display":"block"}}/>
                    {console.log(booking.destination.imageUrl)}</div>
                
                        <div className="col-lg-5" style={{ "width": "500px" }}>
                            <h3 className="font-weight-bold">{booking.destination.destinationName}</h3>
                            <br />
                            <div className="row">
                                <div className="col-sm-4"><span className="font-weight-bold text-secondary">From: </span></div>
                                <div className="col-md font-weight-bold"><em>{booking.checkIn}</em></div></div>
                            <div className="row">
                                <div className="col-sm-4"><span className="font-weight-bold text-secondary">To: </span></div>.
                                <div className="col-sm font-weight-bold"><em>{booking.checkOut}</em></div></div>
                            <div className="row">
                                <div className="col-sm-4"><span className="font-weight-bold text-secondary">No of People: </span></div>
                                <div className="col-sm font-weight-bold"><em>{booking.noOfPeople}</em></div>
                            </div>
                            </div>
                            <div className="col-sm">
                            <h2 className="text-center font-eight-bold">You Paid: <span className="text-success">${(booking.totalCost).toLocaleString()}</span></h2>
                            <br /><br />
                            <button type="button" className="btn btn-danger btn-block" data-toggle="modal" data-target={"#B" + booking.bookingId}>Cancel Booking</button>
                            <div className="modal fade" id={"B" + booking.bookingId} tabIndex="-1" aria-labelledby={"B" + booking.bookingId + "Label"} ari-hidden="true">
                                <div className="modal-dialog modal-lg modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id={"B" + booking.bookingId + "label"}>Cancel Booking</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">-</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <p>Are you sure you want to cancel your trip to"<em>{booking.destination.destinationName}</em>" and claim refund?</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn  btn-danger" data-dimiss="modal" onClick={() => { this.cancelBooking(booking.bookingId,booking.totalCost) }} value={booking.bookingId}>Cancel Trip</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span>{this.state.errorMessage}</span>


                </div>
                        </div>

 
                   
                    ))}
                    
        </div >
    );
}
}
//commit