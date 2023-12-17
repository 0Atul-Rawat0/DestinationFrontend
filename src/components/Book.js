import { Component } from 'react';
import axios from 'axios';
import { backendUrlItinerary, backendUrlBook, backendUrlViewBook } from '../BackendURL';
import "../custom.css";
import { Redirect,Link } from 'react-router-dom';
import ViewAllPackages from './ViewAllPackages';

export class Book extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.match.params.destinationId)
        this.state = {
            booking: [],
            destination: [],
            highlights: [],
            details: [],
            itinerary: [],
            formValue: {
                noOfPeople: "",
                checkIn: "",
                totalCost: "",
                user: {
                    "userId": sessionStorage.getItem("userId"),
                    "userName": sessionStorage.getItem("userName")

                }
            },
            formErrorMessages: {
                noOfPeople: "",
                checkIn: ""
            },
            formValid: {
                noOfPeople: false,
                checkIn: false,
                buttonActive: false
            },
            viewAllPackages:false,
            date1:"",
            date2:"",
            errorMessage: "",
            errorMessage1:"",
            successMessage: "",
            totalCost: "",
            tripEnd: "",
            id:"",
            displayDate: "",
            flightCharge: 0,
            back: false,
            accords: {
                accordButton1: false,
                accordButton2: false,
                accordButton3: false
            }
        }
        console.log(sessionStorage);
       
    }
    setViewAllPackages(){
        this.setState({viewAllPackages:true})
    }

    componentDidMount() {
        axios.get(backendUrlViewBook+ sessionStorage.getItem("userId"))
        .then(response=>{
            console.log(response.data)
            this.setState({booking:response.data})
        }).catch(error=>{
            this.setState({errorMessage1:"nothing"})
        }
            
        )
        this.fetchDetails();
       //Write logic for fetching itinerary details from the backend.

    }
    fetchDetails=()=>{
        axios.get(backendUrlItinerary+"/"+this.props.match.params.destinationId)
        .then(response=>{
            
            this.setState({destination:response.data})
            this.setState({details:response.data.details})
            this.setState({highlights:response.data.details.highlights.toString().split(",")})
            this.setState({itinerary:response.data.details.itinerary})
            this.setState({tripEnd:response.data.noOfNights})
            this.setState({id:sessionStorage.getItem("userId")})
            console.log(backendUrlBook+this.state.id+"/"+this.props.match.params.id)
            console.log(this.state.details)
        })
        .catch(error=>{
            this.setState({error:"Sorry,we don't operate in this destination"})
        })
    }

    setTripEnd = (name,date) => {
        if(name=="checkIn"){
        var d= new Date(date);
        let x=new Date(d);
        x.setDate(x.getDate()+this.state.tripEnd)
        this.setState({displayDate:String(x.getFullYear()+"/"+(x.getMonth()+1)+"/"+x.getDate())})}

      //Implement this function to calculate the trip end date with the help of No. of nights

    }

    totalAmount = (name, value) => {
       //Implement this function the total amount for the booking
       var cost=this.state.destination.chargePerPerson+500;
       if(name=="noOfPeople"){
       
        this.setState({totalCost:(cost*value)});
        
       }
    }

    handleChange = (event) => {
       
        var target = event.target
        var name = target.name;
        var value = target.value;
        var formVal = this.state.formValue;
        this.setState({ formValue: { ...formVal, [name]: value } })
        this.validateField(name, value)
        this.totalAmount(name, value)
       this.setTripEnd(name,value)
    }

    validateField = (fieldName, value) => {
        let formErrorMessages=this.state.formErrorMessages;
        let formValid=this.state.formValid;
        switch(fieldName){
            case "noOfPeople":
                if(value===""){
                    formErrorMessages.noOfPeople="Field Required";
                    formValid.noOfPeople=false

                }
                else{
                    if((value<1)||(value>5)){
                        formErrorMessages.noOfPeople="Number of travelers should be between 1 and 5";
                        formValid.noOfPeople=false;


                    }
                    else{
                        formErrorMessages.noOfPeople=""
                        formValid.noOfPeople=true;
                        
                    }
                }
                break;
                case"checkIn":
                if(value===""){
                    formErrorMessages.checkIn="Field Required"
                    formValid.checkIn=false;

                }
                else{
                    let today=new Date()
                    let dateOfJourney=new Date(value)
                    if(dateOfJourney<=today){
                        formErrorMessages.checkIn="Date of Journey should be after todays"
                        formValid.checkIn=false

                    }
                    else{
                        formErrorMessages.checkIn=""
                        formValid.checkIn=true
                        this.setTripEnd(value);
                    }
                }
                break;
        }
     //Implement this function to validate the booking fields
     this.state.formValid.buttonActive=this.state.formValid.checkIn&&this.state.formValid.noOfPeople
     
        
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.submitBooking();

    }
    submitBooking = () => {
        let start=new Date(this.state.formValue.checkIn)
        let month=start.getMonth()+1;
        let date=start.getDate()+1;
        let startDate=start.getDate();

        if(month<10){
            month='0'+month;
        }
        if(date<10){
            date='0'+date;
            startDate='0'+startDate
        }
        let date1=start.getFullYear()+'-'+month+'-'+date
        let date3=start.getFullYear()+'-'+month+'-'+startDate
        let end=new Date(this.state.displayDate)
        let endMonth=end.getMonth()+1;
        let endDate=end.getDate()+1;
        let endDate1=end.getDate();

        if(endMonth<10){
            endMonth='0'+endMonth;

        }
        if(endDate<10){
                endDate='0'+endDate
                endDate1='0'+endDate1

        }
        let date2=end.getFullYear()+'-'+endMonth+'-'+endDate
        let date4=end.getFullYear()+'-'+endMonth+'-'+endDate1


        var formJSON={
            checkIn:date1,
            checkOut:date2,
            noOfPeople:this.state.formValue.noOfPeople,
            totalCost:this.state.totalCost


        };
        this.setState({successMessage:"",errorMessage:""});
        let val=false
        console.log(date3);
        console.log(date4);
        

       if(this.state.errorMessage1===""){
    for(var i=0;i<this.state.booking.length;i++){
        if(this.state.booking[i].checkIn==date3||this.state.booking[i].checkOut==date4){
                this.setState({errorMessage:"You have already booked a destination for this duration"
         } );
               val=false
              console.log("1")
                break;
                
        }else{
            val=true
            console.log("3")

        }}
    }else{
        axios.post(backendUrlBook+"/"+this.state.id+"/"+this.props.match.params.destinationId,formJSON)
        .then(response=>{
            this.setState( {successMessage:"Booking Done with booking id:"+response.data}
        )
        alert("Booking Done with booking id:"+response.data)
        window.location.reload();})
        .catch(error=>{this.setState(
            {errorMessage:"Please Login First"}
        )
        alert("Please Login to Book your plans")
            return <Redirect to={"/login"}></Redirect>
    })
    }
        if(val===true){
            console.log("2");
            axios.post(backendUrlBook+"/"+this.state.id+"/"+this.props.match.params.destinationId,formJSON)
            .then(response=>{
                this.setState( {successMessage:"Booking Done with booking id:"+response.data}
            )
            alert("Booking Done with booking id:"+response.data)
            window.location.reload();})
            .catch(error=>this.setState(
                {errorMessage:"Please run the backend"}
            ))
           
        }
       

       

        
       //IAdd the logic to submit the booking to backend
    }

    

    closeAccord = (event) => {
        Object.keys(this.state.accords).map(k => {
            if (this.state.accords[k] === true) {
                let accordKey = this.state.accords;
                accordKey[k] = false;
                this.setState({ accords: accordKey })
            } else if (event.target.id === k) {
                let accordKey = this.state.accords;
                accordKey[k] = true;
                this.setState({ accords: accordKey })
            } else {
                let accordKey = this.state.accords;
                accordKey[k] = false;
                this.setState({ accords: accordKey })
            }
        })
    }
    render() {
        if (this.state.viewAllPackages === true)
        return  <Redirect to="/packages" component={ViewAllPackages} />;
        //Add the missing logic to complete the view
        return (
            <>
               
                <div className="row px- 2 py-3">
                    <div className="col-lg-6 col-md-5 col-sm-12">
                        <h3>{this.state.destination.destinationName}</h3>
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between">
                                    <span id="accord">Overview</span>
                                    <span id="accordButton1" className="close" style={{ transform: this.state.accords.accordButton1 ? "rotate(135deg)" : "rotate(90deg)" }} onClick={this.closeAccord}>+</span>
                                </div>
                            </div>
                        </div>
                        <div className="hiddenBox" style={{ display: this.state.accords.accordButton1 ? "block" : "none" }}>
                            <p>{this.state.details.about}</p>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between">
                                    <span id="accord">Highlights</span>
                                    <span id="accordButton2" className="close" style={{ transform: this.state.accords.accordButton2 ? "rotate(135deg)" : "rotate(90deg)" }} onClick={this.closeAccord}>+</span>
                                </div>
                            </div>
                        </div>
                        <div className="hiddenBox" style={{ display: this.state.accords.accordButton2 ? "block" : "none" }}>
                            <p>{this.state.highlights.map(h=><li key={h}>{h}</li>)}</p>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between">
                                    <span id="accord">Tour Pace</span>
                                    <span id="accordButton3" className="close" style={{ transform: this.state.accords.accordButton3 ? "rotate(135deg)" : "rotate(90deg)" }} onClick={this.closeAccord}>+</span>
                                </div>
                            </div>
                        </div>
                        <div className="hiddenBox" style={{ display: this.state.accords.accordButton3 ? "block" : "none" }}>
                            <span>1: {this.state.itinerary.firstDay}</span><br /><br />
                            <span>2:Rest Of Days: {this.state.itinerary.restOfDays}</span><br /><br />
                            <span>3: {this.state.itinerary.lastDay}</span><br /><br />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-7 col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="text-center font-weight-bold text warning">Book Your Trip</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label className="font-weight-bold d-flex justify-content-start">Number of Travellers</label>
                                        <input type="number" name='noOfPeople' className='form-control' onChange={this.handleChange}/>
                                        <span className='text-danger'>{this.state.formErrorMessages.noOfPeople}</span>
                                    </div>
                                    <div className="form-group">
                                        <label className="font-weight-bold d-flex justify-content-start">Trip Start Date</label>
                                        <input type="date" name='checkIn' className='form-control' onChange={this.handleChange}/>
                                        <span className='text-danger'>{this.state.formErrorMessages.checkIn}</span>

                                    </div>
                                   
                                </form>
                                <span className="font-weight-bold">Your Trip Ends on: {this.state.displayDate}</span><br /><br />
                                <h5>You Pay: ${this.state.totalCost}</h5>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <button type="submit" name="book" className='btn btn-success' onClick={this.handleSubmit} disabled={!this.state.formValid.buttonActive}>CONFIRM BOOKING</button>
                                <Link  name="goBack" className="btn btn-secondary" to="/packages">GO BACK</Link><br/>
                                </div>
                                <span className='text-success'>{this.state.successMessage}</span>
                                <span className='text-danger'>{this.state.errorMessage}</span>
                        </div>
                    </div>
                </div>
            </>
        )
    }


}
// pull comment
