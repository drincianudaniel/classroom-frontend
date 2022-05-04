import React, { Component } from "react";
import axios from "axios";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Profile extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            user: ""
          }
    }

    componentDidMount(){
        this.checkUser()
    }
    
    checkUser(){
        if (this.props.user.user_type == "Student"){
            var user = <p>This is a student</p>
        }
        else if(this.props.user.user_type == "Teacher"){
            var user = <p>This is a Teacher</p>
        }
        this.setState({
            user
          })
    }

    render(){
        return(
            <div>
                <FontAwesomeIcon icon={faUser} />
                <p>{this.props.user.name}`s Profile</p>
                <p>Username: {this.props.user.name}</p>
                <p>Email: {this.props.user.email}</p>
                <p>User type: {this.props.user.user_type}</p>
                {this.state.user}
            </div>
        );
    }
}
export default Profile;