import React from "react";
import axios from "axios";
import Class from "./Class.js";
import Sidebar from "react-sidebar";
import Login from "./authentification/Login.js";
import "../css/sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


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
        sidebar={ <ul> <li>Larisa</li> <li>Dani</li> <li>Alin</li> </ul>   }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white", width: "200px" } }}>  

        <nav class="navbar navbar-expand-lg navbar-light bg-white">
          
          {/* <a  class="navbar-brand" onClick={() => this.onSetSidebarOpen(true)}>
          <FontAwesomeIcon icon={faBars} />
        </a>  */}
              {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup"> */}
                <div class="navbar-nav test">
                  <div class="test2">
                <a  class="nav-item nav-link round" onClick={() => this.onSetSidebarOpen(true)}>
                  <FontAwesomeIcon icon={faBars} />
                </a> 
                  <a class="nav-item nav-link active" href="#">Classroom<span class="sr-only">(current)</span></a>
                  </div>
                  {/* <a class="nav-item nav-link" href="#">Features</a> */}
                  <div class="test2">
                  <a class="nav-item nav-link round" href="#"><FontAwesomeIcon icon={faPlus} /></a>
                  <a class="nav-item nav-link" href="#">{this.props.user.name}`s Profile</a>
                  <a class="nav-item nav-link" onClick={() => this.handleLogoutClick()}>Logout</a>
                  </div>
                </div>
              {/* </div> */}
           </nav>
        <div class="informatii">
              <div >
                  <h1>HELLO, {this.props.user.name}!</h1>
              </div>       
        </div>
          <div> <Class/> </div>
        </Sidebar>    
    </div>
   );
  }
};

export default Dashboard;