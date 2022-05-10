import React, { Component, useEffect } from "react";
import axios from "axios";
import { faUser, faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "react-sidebar";
import { Link } from "react-router-dom";
import "../css/profile.css"


class Profile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          sidebarOpen: false,
          email: this.props.user.email,
          name: this.props.user.name
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    // componentDidMount(){
    //     this.findStudent()
    // } 

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    handleEdit(event)
    {
        console.log("a plecat")
        axios
            .patch(
             "http://localhost:3000/updateuser",
            {
                user: {
                    name: this.state.name
                }
            },
            { withCredentials: true }
            )
            .then(res => {

                this.props.history.push("/dashboard");
                window.location.reload(true);
            })
            .catch(error =>  {
            console.log(error);
        });
        event.preventDefault();
    }

    handleLogoutClick(){
        axios
          .delete("http://localhost:3000/logout", { withCredentials: true })
          .then(response => {
            // this.props.handleLogout();
            this.props.history.push("/");
            window.location.reload(true);
          })
          .catch(error => {
            console.log("logout error", error);
        });
    }


    // findStudent(){
    //     const user = this.props.user
    //     this.setState({
    //         email: user.email,
    //         name: user.name
    //     })
    // }
    render(){
        return(
        <div>
            <Sidebar
              sidebar={ <ul> <li>Larisa</li> <li>Dani</li> <li>Alin</li> </ul>   }
              open={this.state.sidebarOpen}
              onSetOpen={this.onSetSidebarOpen}
              styles={{ sidebar: { background: "white", width: "200px" } }}>  
                <nav class="navbar navbar-expand-lg navbar-light bg-white">
                    <div class="navbar-nav test">
                        <div class="test2">
                            <a class="nav-item nav-link round" onClick={() => this.onSetSidebarOpen(true)}><FontAwesomeIcon icon={faBars} /></a> 
                            <Link to={"/dashboard"} class="nav-item nav-link active">Classroom<span class="sr-only">(current)</span></Link>
                        </div>
                        {/* <div>
                        <a class="nav-item nav-link" href="#">Features</a>
                        </div> */}
                        <div class="test2">
                            <a class="nav-item nav-link round" href="#"><FontAwesomeIcon icon={faPlus} /></a>
                            <Link to={"/profile"} className="nav-item nav-link">{this.props.user.name}`s Profile</Link>
                            <a class="nav-item nav-link" onClick={() => this.handleLogoutClick()}>Logout</a>
                        </div>
                    </div>
                </nav>
                
                <div class="container">
                    <div class="row">
			            <div class="my-5">
				            <h3>My Profile</h3>
			            </div>
                        <form onSubmit={this.handleEdit}>
                            <div class="row mb-5 gx-5">
                                <div class="col-xxl-8 mb-5 mb-xxl-0">
                                    <div class="bg-secondary-soft px-4 py-5 rounded">
                                        <div class="row g-3">
                                            <h4 class="mb-4 mt-0">Contact detail</h4>
                                            {this.props.user.user_type === "Student" && <p>This is a Student</p>}
                                            {this.props.user.user_type === "Teacher" && <p>This is a Teacher</p>}
                                            <div class="col-md-6">
                                                <label class="form-label">First Name</label>
                                                <input type="text" class="form-control" placeholder="" aria-label="Name" value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="inputEmail4" class="form-label">Email</label>
                                                <input type="email" class="form-control" id="inputEmail4" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                                            </div>
                                            <button type="submit" class="btn btn-dark">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Sidebar>    
        </div>
        );
    }
}
export default Profile;