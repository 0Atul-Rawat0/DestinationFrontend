import React, { Component } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import { backendUrlHotDeal } from "../BackendURL";



export class ViewAllPackages extends Component {

    constructor(props) {
        super(props)
        this.state = {
            destinations: [],
            
           destinationId:"",
            errorMessage: "",
            viewPackages:false
            
           
        }
    }
    componentDidMount() {
        //Write logic to fetch the hotdeal data from the backend

        this.getPackages()
    }
    getPackages=()=>{
       
        axios.get(backendUrlHotDeal)
        .then(response=>{
            
            this.setState({destinations:response.data,
                destinationId:response.data[0].destinationId})
        })
        .catch(error=>{
           this.setState({ errorMessage:"Please run the backend"
        })
    })
}
    viewPackages=()=>{
        console.log(this.state.destinations)
      
        this.setState({viewPackages:true})
    }

    render() {
        
         
        return (
            <>
            <div style={{backgroundColor:"rgb(230,230,250)"}}>
               
                <div className='container' style={{paddingTop:70}}>
                    <h3 className="text-danger" style={{textAlign:"center"}}>{this.state.errorMessage}</h3>
                    <div className='row'>
                        {this.state.destinations.map((cardData) => {
                            const { destinationId, continent, destinationName, imageUrl } = cardData;
                            return (<>
                                <div className='col-md-3 zoom' style={{marginBottom:15}}><br/>
                                <div key={destinationId} className="card-item" height={400} width={512}>
                                    <img className="itemCardBox2 pointer"  src={imageUrl} alt="Card image" height={250} width={200} />
                                    <div className="card-body">
                                        <h4 className="mdl-card__title">{continent}</h4>
                                        <p>{destinationName}</p>
                                        {/* <a href="#" class="btn btn-primary">View Deal</a> */}
                                        <div style={{position:'absolute',bottom:0}}>
                                        <Link className='btn btn-primary ' to={"/itinerary/"+destinationId}>View Details</Link>
                                       </div>
                                    </div>
                                </div><br/>
                               
                                </div><br/>
                                
                                </>
                            );
                        })}
                    </div>
                </div>
                </div>



            </>
        )
    }

}

export default ViewAllPackages;