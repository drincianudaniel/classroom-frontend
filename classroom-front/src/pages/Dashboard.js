import React from "react";
import axios from "axios";
import Class from "./Class.js";
import Sidebar from "react-sidebar";
import Login from "./authentification/Login.js";
import "../css/sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import ClassSidebar from "./ClassSidebar.js";


class Dashboard extends React.Component{
   
    
    constructor(props) {
        super(props);
        this.state = {
          sidebarOpen: false
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
         
       <Sidebar
        sidebar={ <ClassSidebar/ >  }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white", width: "300px" } }}>  

        <nav class="navbar navbar-expand-lg navbar-light bg-white">
                <div class="navbar-nav test">
                  <div class="test2">
                        <a class="nav-item nav-link round" onClick={() => this.onSetSidebarOpen(true)}><FontAwesomeIcon icon={faBars} /> </a> 
                        <a class="nav-item nav-link active edit" >Classroom<span class="sr-only">(current)</span></a>
                  </div>
                  <div class="test2">
                      <a class="nav-item nav-link round" href="#"><FontAwesomeIcon icon={faPlus} /></a>
                      <Link to={"/profile"} class="nav-item nav-link cardtitledesc">{this.props.user.name}`s Profile</Link>
                      <a class="nav-item nav-link cardtitledesc" onClick={() => this.handleLogoutClick()}>Logout</a>
                  </div>
                </div>
           </nav>
        <div class="informatii">
              <div >
                  <h1>HELLO, {this.props.user.name}!</h1>
              </div>       
        </div>
           <Class/> 
        </Sidebar>    
    </div>
   );
  }
};

export default Dashboard;