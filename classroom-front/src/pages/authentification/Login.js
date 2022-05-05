import React, { Component } from "react";
import axios from "axios";
import Dashboard from "../Dashboard";
import bootstrap from 'bootstrap' ;
import "../../css/style.css"

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password } = this.state;

    axios
      .post(
        "http://localhost:3000/login",
        {
          user: {
            email: email,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: "No such user"
        })
      });
    event.preventDefault();
  }

  render() {
    return (
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-8 col-md-6 col-lg-4 center">

            <form class="row justify-content-center align-items-center" onSubmit={this.handleSubmit}> 
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" aria-describedby="emailHelp" name="email" autocomplete="off" placeholder="Enter email" value={this.state.email}
                    onChange={this.handleChange}
                    required/>
              </div>

              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" name="password" placeholder="Password" value={this.state.password}
                    onChange={this.handleChange}
                    required/>
              </div>

              <button type="submit" class="btn btn-dark">Login</button>
              {this.state.error && <div class="row justify-content-center align-items-center err">{this.state.error}</div>} 
            </form>
          </div>
        </div>
      </div>
    );
  }
}