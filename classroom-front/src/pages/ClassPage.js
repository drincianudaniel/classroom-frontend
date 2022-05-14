import React from "react";
import axios from "axios";
import Sidebar from "react-sidebar";
import "../css/sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import ClassSidebar from "./ClassSidebar.js";
import Assignments from "./Assignments";
import Modal from 'react-bootstrap/Modal';

class ClassPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          sidebarOpen: false,
          classroom_id: this.props.match.params.id,
          assignment_name:"",
          assignment_details:""
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleOpenModal() {
        this.setState({ show: !this.state.show });
      }
    
      onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
      }

      handleSubmit(){
        axios
        .post("http://localhost:3000/createassignment",
        {
          assignment: {
              classroom_id:this.state.classroom_id,
              name: this.state.assignment_name,
              details: this.state.assignment_details
          }
        },
        { withCredentials: true })
        .then(response=> {
          this.handleOpenModal()
          window.location.reload(true)
        })
        .catch(error => {
          console.log("Couldn`t create assignment")
        })
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
    
    return(
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
                          <a class="nav-item nav-link active edit" href="/dashboard">Classroom<span class="sr-only">(current)</span></a>
                    </div>
                    <div class="test2">
                        <a class="nav-item nav-link round" onClick={() =>this.handleOpenModal()}><FontAwesomeIcon icon={faPlus} /></a>
                        <Modal size="md" centered show={this.state.show} onHide={() =>this.handleOpenModal()}>
                        <Modal.Header closeButton><Modal.Title>Create an assignment</Modal.Title></Modal.Header>
                          <Modal.Body>
                            <form onSubmit={this.handleSubmit}>
                              <label>Assignment name:</label><br/>
                              <input type="text" class="modalInput" placeholder="Assignment name" onChange={e => this.setState({assignment_name: e.target.value})} value={this.state.assignment_name}/><br/>
                              <p>Assignment details:
                                <span class="textarea input" role="textbox" contenteditable="true" onInput={e => this.setState({assignment_details: e.currentTarget.innerText})} value={this.state.assignment_details} ></span>
                              </p>
                            </form>
                          </Modal.Body>
                          <Modal.Footer>
                            <a class="af" onClick={() =>this.handleOpenModal()}>
                              Close
                            </a>
                            <a class="af" onClick={() =>this.handleSubmit()} >
                              Create
                            </a>
                          </Modal.Footer>
                       </Modal>
                        <Link to={"/profile"} class="nav-item nav-link cardtitledesc">{this.props.user.name}`s Profile</Link>
                        <a class="nav-item nav-link cardtitledesc" onClick={() => this.handleLogoutClick()}>Logout</a>
                    </div>
                  </div>
          </nav>
          <div class="container">
            <div class="bannerPhoto ">
              <div class="bannerText"> <p> Clasa x</p> </div>
            </div>
           </div>
        <div>
            <Assignments/>
        </div>

          </Sidebar>
        </div>
    );
    }
}
export default withRouter(ClassPage);
