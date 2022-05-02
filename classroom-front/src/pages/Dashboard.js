import React from "react";
import axios from "axios";
import Class from "./Class.js";

class Dashboard extends React.Component{

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

  render(){
  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
        <button>Create Class</button>
      </div>
      <Class/>
    </div>
   );
  }
};

export default Dashboard;