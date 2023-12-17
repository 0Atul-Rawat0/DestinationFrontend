import React from "react";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import Axios from "axios";
import "../custom.css";
import { backendUrlRegister } from "../BackendURL";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        userName: "",
        emailId: "",
        password: "",
        gender: "",
        contactNumber: ""
      },
      formErrorMessage: {
        userName: "",
        emailId: "",
        password: "",
        gender: "",
        contactNumber: ""
      },
      formValid: {
        userName: false,
        emailId: false,
        password: false,
        gender: false,
        contactNumber: false,
        buttonActive: false
      },
      successMessage: "",
      errorMessage: ""
    }
  }

  handleChange = (event) => {
    var name = event.target.name
    var value = event.target.value
    var formVal2 = this.state.formValue
    this.setState({ formValue: { ...formVal2, [name]: value } })
    this.validate(name, value)
  }

  validate = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrorMessage;
    let formValid = this.state.formValid;
    switch (fieldName) {
      case "userName":
        const NameRegex = /^[a-zA-Z\s]+$/;
        if (value === "") {
          fieldValidationErrors.userName = "Field Required";
          formValid.userName = false
        }

        else if (!NameRegex.test(value)) {
          fieldValidationErrors.userName = "Name should contain only alphabets and space";
          formValid.userName = false
        }
        else {
          fieldValidationErrors.userName = "";
          formValid.userName = true
        }
        break;

      case "emailId":
        const emailRegex = /^.*@.*$/;
        if (value === "") {
          fieldValidationErrors.emailId = "Field required";
          formValid.emailId = false;
        } else if (!value.match(emailRegex)) {
          fieldValidationErrors.emailId = "Please enter valid email id";
          formValid.emailId = false;
        } else {
          fieldValidationErrors.emailId = "";
          formValid.emailId = true;
        }
        break;

      case "gender":
        if (value === "") {
          fieldValidationErrors.gender = "Field Required";
          formValid.gender = false
        }
        else {
          fieldValidationErrors.gender = "";
          formValid.gender = true
        }
        break;
      case "contactNumber":
        const contactNoRegex = /^[6-9][0-9]{9}$/;
        if (value === "") {
          fieldValidationErrors.contactNumber = "Field required"
          formValid.contactNumber = false;
        } else if (!value.match(contactNoRegex)) {
          fieldValidationErrors.contactNumber = "Please enter valid contact number";
          formValid.contactNumber = false;
        }
        else {
          fieldValidationErrors.contactNumber = "";
          formValid.contactNumber = true;

        }
        break;
      case "password":
        var errorMessage = "";
        if (value) {
          var regexCAp = new RegExp(/^.*[A-Z].*$/);
          var regexLow = new RegExp(/^.*[a-z].*$/);
          var regexNum = new RegExp(/^.*[0-9].*$/);
          var regexSpecialChar = new RegExp(/^.*[!@#$%^&*].*$/);

          errorMessage = !regexCAp.test(value)
            ? errorMessage + "Should contain atleast 1 upper case letter," : errorMessage;
          errorMessage = !regexLow.test(value) ?
            errorMessage + "Should contain atleast 1 lower case letter," : errorMessage;
          errorMessage = !regexNum.test(value)
            ? errorMessage + "Should contain atleast 1 number," : errorMessage;
          errorMessage = !regexSpecialChar.test(value)
            ? errorMessage + "Should contain atleast 1 special character," : errorMessage;
        }
        else {
          errorMessage = "field required";
        }
        if (errorMessage !== "") {
          this.setState({ passwordErrorMessage: errorMessage });
        } else {
          this.setState({
            passwordErrorMessage: "",
            validPassWord: true
          });
        }


        this.setState({
          password: value
        });
        break;
      default:
        break;
    }
    formValid.buttonActive =
      formValid.userName &&
      formValid.emailId &&
      formValid.gender &&
      formValid.contactNumber
    this.setState({
      formErrorMessage: fieldValidationErrors,
      formValid: formValid,
      successMessage: "", errorMessage: ""
    });
  }


  handleSubmit = (event) => {
    event.preventDefault()
    this.register()
  }

  register = () => {
    this.setState({ successMessage: "", errorMessage: "" })
    Axios.post(backendUrlRegister, this.state.formValue)
      .then(response => {
        this.setState({ successMessage:response.data })
      })
      .catch(error => {

        this.setState({ errorMessage: "OOPS! Registration failed! Please try again." })
      })
  }

  render() {
    return (


      <div className="bg" style={{ paddingTop: 60, paddingBottom: 50 }}>
        <div className="row my-5">
          <section className="col"></section>
          <section className="col">

            <form onSubmit={this.handleSubmit} className="form form horizontal" style={{ borderStyle: "hidden", boxShadow: "0 5px 15px 7px black", padding: "30px", backgroundColor: "transparent",borderRadius:"20px" ,backdropFilter:"blur(5px)" }}>
              <h1 className="text-dark" style={{ padding: "20px", fontFamily: "arial", boxShadow: "0 3px 7px 2px black",borderRadius:"10px" }}><center>Register Here</center></h1><br></br>
              <div className="form-group">
                <span className="p-float-label">
                  <InputText id="username" required style={{ padding: 25,background:"rgba(0,0,0,0.5)",color:"white",borderColor:"white",borderRadius:"10px"  }} type="text" name="userName" onChange={this.handleChange} className="form-control" value={this.state.formValue.userName} />
                  {<label htmlFor="userName" className="font-weight-bold text-light">UserName</label>}
                </span>
                {this.state.formErrorMessage.userName ? (<Message severity="error" text={this.state.formErrorMessage.userName} />) : null}
              </div><br></br>


              <div className="form-group">
                <span className="p-float-label">
                  <InputText id="emailId" required style={{ padding: 25,background:"rgba(0,0,0,0.5)",color:"white",borderColor:"white",borderRadius:"10px" }} type="email" name="emailId" onChange={this.handleChange} className="form-control" value={this.state.formValue.emailId} />
                  {<label htmlFor="emailId" className="font-weight-bold text-light">Email Id</label>}
                </span>
                {this.state.formErrorMessage.emailId ? (<Message severity="error" text={this.state.formErrorMessage.emailId} />) : null}
              </div><br></br>


              <div className="form-group">
                <span className="p-float-label">
                  <label className="form-group" style={{ fontWeight: "bold", color: "white", fontSize: "20px" }}>Gender</label>

                  <div className="form-check-inline">
                    <span>
                      <div className="form-check-inline">
                        <label className="form-check-label" style={{ fontWeight: "bold", color: "white" }} >
                          <input type="radio" value="Male" name="gender" onChange={this.handleChange} className="form-check-input" /> Male
                        </label>
                      </div>
                    </span>
                  </div>
                  <div className="form-check-inline">
                    <span>
                      <div className="form-check-inline">
                        <label className="form-check-label" style={{ fontWeight: "bold", color: "white" }} >
                          <input type="radio" value="Female" name="gender" onChange={this.handleChange} className="form-check-input" /> Female
                        </label>
                      </div>
                    </span>
                  </div>
                </span>
                {this.state.formErrorMessage.gender ? (<Message severity="error" text={this.state.formErrorMessage.gender} />) : null}
              </div>
              <br></br>

              <div className="form-group">
                <span className="p-float-label">
                  <InputText id="contactNumber" required style={{ padding: 25 ,color:"white",background:"rgba(0,0,0,0.4)",borderRadius:"10px"}} type="number" name="contactNumber" min="6000000000"
                    max="9999999999" onChange={this.handleChange} className="form-control" value={this.state.formValue.contactNumber} />
                  {<label htmlFor="contactNumber" className="font-weight-bold text-light">Contact Number</label>}
                </span>
                {this.state.formErrorMessage.contactNumber ? (<Message severity="error" text={this.state.formErrorMessage.contactNumber} />) : null}
              </div><br></br>

              <div className="form-group">
                <span className="p-float-label">
                  <InputText id="password" required style={{ padding: 25,color:"white",background:"rgba(0,0,0,0.4)",borderRadius:"10px" }} type="password" name="password" onChange={this.handleChange} className="form-control" value={this.state.formValue.password} />
                  {<label htmlFor="password" className="font-weight-bold text-light">Password</label>}
                </span>
                {this.state.passwordErrorMessage ? (
                  this.state.passwordErrorMessage.split(",").filter(m => m !== "").map(
                    m => <Message
                      severity="error"
                      text={m}
                    />

                  )


                ) : null}
              </div><br></br>

              <div className="form-group" ><br></br>
                <button className="btn btn-primary" type="submit" style={{ padding: "10px", fontWeight: "bold" ,borderRadius:"10px"}} disabled={!this.state.formValid.buttonActive}>Register</button>
              </div>

              <span name="successMessage" className="text-success">{this.state.successMessage}</span>
              <span name="errorMessage" className="text-danger">{this.state.errorMessage}</span>

            </form>

          </section>

          <section className="col"></section>
        </div>

      </div>
    );
  }
}

export default Register;
