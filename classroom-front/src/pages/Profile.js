import React, { Component, useEffect } from "react";
import axios from "axios";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class Profile extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <FontAwesomeIcon icon={faUser} />
                <p>{this.props.user.name}`s Profile</p>
                <p>Username: {this.props.user.name}</p>
                <p>Email: {this.props.user.email}</p>
                <p>User type: {this.props.user.user_type}</p>
                {this.props.user.user_type === "Student" && <p>This is a Student</p>}
                {this.props.user.user_type === "Teacher" && <p>This is a Teacher</p>}
                {/* {(this.props.user.user_type === "Student") ? <p>This is a Student</p> : <p>This is a Teacher</p>} */}
            </div>
        );
    }
}
export default Profile;