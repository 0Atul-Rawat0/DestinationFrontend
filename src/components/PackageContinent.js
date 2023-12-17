import { Component } from 'react';
import Axios from 'axios';
import { backendUrlPackageSearch } from '../BackendURL';

import { Redirect ,Link} from 'react-router-dom';
import { Book } from './Book';

export class PackageContinent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destinations: [],
            itineraryButton: false,
            bookButton: false,
            errorMessage: "",
            errorMessage2: "",
            itinerary: [],
            destForPackage: "",
            destForBook: "",
            bookme: false,
            packages:null,
            id:"",
            imgSrc:""
            


        }
    }
    componentDidMount() {
        //Implement this function to fetch package details by continent from the backend
        this.fetchDetails();
    }
    fetchDetails = () => {
        Axios.get(backendUrlPackageSearch +"/"+ this.props.match.params.continent)
            .then(response => {
                
                this.setState({ destinations: response.data })

            })
            .catch(error => { this.setState({ errorMessage: "Sorry! This destination is unavailable" ,imgSrc:"../assets/emoji1.jpg", errorMessage2:"Search another place..."}) })
    }
    book = () => {
        this.setState({ bookme: true })
    }
    card = (c) => {
        var id = c.destinationId;
        let style = {
            height: 350,
            overflowY: "scroll"
        }
        let details = null;
        if (this.state.packages === c.destinationId) {
            details = <div style={style}><emp>{c.details.about}</emp></div>
        }
        return (
            
            <div  className="col-md-4 zoom" >
                <div  className="card card-border" height={300} width={300}>
                    {console.log(c.imageUrl)}
                    <img className="card-img" src={c.imageUrl} alt="Image is not Available" height={200} width={200} />
                    <div className='card-header'>
                        {c.continent}
                    </div>
                    <div className='card-body'>
                    
                        <p className='card-text'><b>Destination Name:</b> {c.destinationName}</p>
                        <p className='card-text'><b>Number Of Nights:</b> {c.noOfNights}</p>
                        <p className='card-text'><b>Flight Charges:</b> {c.flightCharge}</p>

                        <p className='card-text'><b>Charges per Person:</b> {c.chargePerPerson}</p>
                        <p className='card-text'><b>Discount:</b> {c.discount}</p>

                        <p className='card-text'><b>Availability:</b> {c.availability}</p>
                        <p className='card-text'><b>Details:</b> {details}</p> <br/>
                        <div className='card-footer' style={{position:"absolute"}}>

                            <Link className='btn btn-success' to={"/book/" + id} >Book</Link>&nbsp;&nbsp;
                            <button className='btn btn-primary' data-toggle='collapse' onClick={(e) => {
                                e.preventDefault();
                               this.state.packages===null? this.setState({ packages: c.destinationId }):this.setState({ packages: null})
                            }}>View</button>
                            
                        </div> <br/> <br/>
                    </div>



                </div><br/>
            </div >
            
        )
    }

    render() {
        // return null
        //Write the logic to display the packages searched by continent
        console.log(this.state.id)
        if (this.state.bookme === true) {
            return <Redirect to={"/book/" + this.state.id} component={Book}></Redirect>
        }
        return (
            <>
            <div style={this.state.errorMessage===""?{backgroundColor:"rgb(230,230,250)"}:null}>
                <div className='container'>
                
                    <div className='row'>
                        {this.state.destinations.map(val => this.card(val))}
                    </div>

                </div><br/><br/><br/><br/>
                <span className='text-danger' ><h1><b><center>{this.state.errorMessage}<br/><br/><img src={this.state.imgSrc}></img><br/>{this.state.errorMessage2}</center></b></h1></span>
                <span className='text-danger' name="error" style={{ top: "300px", position: "absolute", left: "250px" }}><h1><b><center>{this.state.error}</center></b></h1></span>
                </div>
            </>
        )
    }
}
// adding check