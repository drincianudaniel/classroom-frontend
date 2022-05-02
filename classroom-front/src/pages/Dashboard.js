import React from "react";
import axios from "axios";
import Class from "./Class.js";
import Sidebar from "react-sidebar";
import Login from "./authentification/Login.js";
import "../css/sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


class Dashboard extends React.Component{
   
    
    constructor(props) {
        super(props);
        this.state = {
          sidebarOpen: true
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
      }
    
      onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
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

  render(){
  return (
    <div>
       
      <div>
      <Sidebar
        sidebar={ <ul> <li>Larisa</li> <li>Dani</li> <li>Alin</li> </ul>   }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white" } }}>  

          <a onClick={() => this.onSetSidebarOpen(true)}>
          <FontAwesomeIcon icon={faBars} />
        </a> 
      </Sidebar>
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