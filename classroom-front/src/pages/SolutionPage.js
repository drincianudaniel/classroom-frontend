import React, { Component, Fragment, useEffect } from "react";
import axios from "axios";
import Sidebar from "react-sidebar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClipboardList, faEdit } from '@fortawesome/free-solid-svg-icons'
import ClassSidebar from "./ClassSidebar.js";
import Modal from 'react-bootstrap/Modal';
import "../css/solution.css"

class SolutionPage extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
          sidebarOpen: false,
          solution: [],
          assignment: [],
          show: false,
          solutions: [],
          solution_content:"",
          username: "",
          grade: "",
          ModalData: "",
          grade_student: ""
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        console.log(this.props)
      }

      componentDidMount(){
        this.getSolutionData()
        this.getAssignmentDetails()
        this.getAllSolutionData()
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    handleOpenModal() {
    this.setState({ show: !this.state.show });
    }
    getAssignmentDetails(){
        axios
        .get(`http://localhost:3000/getassignment/${this.props.match.params.assignment_id}`, { withCredentials: true })
        .then(res =>{
            // const data = res.data
            this.setState({

                assignment: res.data.assignment

            })
            console.log(this.state.assignment)
            
        })
        .catch((error) => {
            console.log(error)
         })
    }
    createSolution(){
        axios
        .post(`http://localhost:3000/createsolution`,
        {
               solution: {
                   assignment_id: this.props.match.params.assignment_id,
                   solution_content: this.state.solution_content
               } 
        },
        { withCredentials: true })
        .then(res =>{
            this.getSolutionData()
        })
        .catch((error) => {
            console.log(error)
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
    editSolution(id){
        axios
          .patch(`http://localhost:3000/editsolutions/${id}`,
          {

            grade: this.state.grade
          },
          { withCredentials: true })
            .then(res =>  {
                this.handleOpenModal();
                this.getAllSolutionData();
            })
          .catch((error) => {
            console.log(error)
          })
      }
    getAllSolutionData(){
        axios
        .get(`http://localhost:3000/allsolutions/${this.props.match.params.assignment_id}`, { withCredentials: true })
        .then(res =>{
            const data = res.data
            const solutions = data.map(u =>
              <div>
                <div>
                    <p class="NumeStudent">{u.user.name}</p>
                    {u.grade === null && <p class="GradeStudent">Not graded yet</p>}
                    {u.grade && <p class="GradeStudent">( {u.grade}/100 )</p>}
                    <a onClick={()=> {this.handleOpenModal(); 
                                                        this.setState({ModalData: u, grade: u.grade});}}>
                    <FontAwesomeIcon class="icon6" icon={faEdit} /> </a>
                </div>
                <p>{u.solution_content}</p> 
                <hr style={{height:"2px"}} />
              </div>  
              
            )
            console.log(this.state.username)
            this.setState({
                solutions
            })
        })
    }
    getSolutionData(){
        axios
        .get(`http://localhost:3000/usersolutions/${this.props.match.params.assignment_id}`, { withCredentials: true })
        .then(res =>{
            const data= res.data.solutions
            const solution = data.map(u =>
                <div>
                    <div>{u.solution_content} </div>
                       {this.setState({
                           grade_student: u.grade
                       })}
                 </div>
                    
            )
            this.setState({
                solution
            })
        })
        .catch((error) => {
            console.log(error)
      })
    }

    render(){ 
     return(
        <Sidebar
        sidebar={ <ClassSidebar/ >  }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white", width: "300px" } }}>  

        <nav class="navbar navbar-expand-lg navbar-light bg-white">
            <div class="navbar-nav test">
              <div class="test2">
                    <a class="nav-item nav-link round" onClick={() => this.onSetSidebarOpen(true)}><FontAwesomeIcon icon={faBars} /> </a> 
                    <Link to={"/dashboard"} class="nav-item nav-link active">Classroom<span class="sr-only">(current)</span></Link>
              </div>
                  <div class="test2">
                      <Link to={"/profile"} class="nav-item nav-link cardtitledesc">{this.props.user.name}`s Profile</Link>
                      <a class="nav-item nav-link cardtitledesc" onClick={() => this.handleLogoutClick()}>Logout</a>
                  </div>
                </div>
           </nav>
           {/* BODY */}
           <div class="body">
                {/* STUDENT */}
                {this.props.user.user_type === "Student" &&
                <div class="row" style={{marginTop:"50px", marginBottom:"50px"}}>
                    <div class="col-1">
                        <FontAwesomeIcon class="icon5" icon={faClipboardList} />
                    </div>
                    <div class="col-9"> 
                        <div class="title_assignment">
                            <p>{this.state.assignment.name}</p>
                        </div>
                        {this.state.grade_student === null && <p>Not marked yet</p>}
                        {this.state.grade_student && <p>{this.state.grade_student}/100</p>}           
                        <hr style={{height:"2px"}} class="liniuta"/>
                        <div>
                            <p> {this.state.assignment.details} </p>
                        </div>
                        <hr style={{height:"2px"}} class="liniuta"/>  
                    </div>
                    <div class="col-2">
                        {/* STUDENT when NO SOLUTION */}
                        {this.state.solution.length === 0 && 
                            <div class="cardSolution">
                                <div class="TitluCard">
                                    <p>Submit solution </p>
                                </div>
                                <div class="card-body">
                                    <span style={{overflowY:"scroll"}} class="textarea input solutionInput" role="textbox" contenteditable="true" onInput={e => this.setState({solution_content: e.currentTarget.innerText})} value={this.state.solution_content}></span>
                                    <br/>
                                    <button class="btn btn-primary" onClick={() =>this.createSolution()}>Submit solution</button>
                                </div>
                            </div>}
                    </div>
                </div>}
                <div>
                    {/* STUDENT when SOLUTION posted */}
                    {this.state.solution.length !==0 &&
                    <div>
                        <h3>Your solution:</h3><br/>
                        <p>{this.state.solution}</p>
                    </div>
                    }
                </div>
                {/* TEACHER */}
                {this.props.user.user_type === "Teacher" &&
                <div>
                    <div class="row" style={{marginTop:"50px", marginBottom:"50px"}}>
                        <div class="col-1">
                            <FontAwesomeIcon class="icon5" icon={faClipboardList} />
                        </div>
                        <div class="col-9"> 
                            <div class="title_assignment">
                                <p>{this.state.assignment.name}</p>
                            </div>

                            <hr style={{height:"2px"}} class="liniuta"/>
                            <div>
                                <p> {this.state.assignment.details} </p>
                            </div>
                            <hr style={{height:"2px"}} class="liniuta"/>
                        </div>
                    </div>
                    {/* TEACHER when nobody posted a solution */}
                    {this.state.solutions.length === 0 &&
                    <div>
                        <h3>Nobody posted a solution yet.</h3>
                    </div>}
                    {/* TEACHER when somebody posted a solution */}
                    {this.state.solutions.length !== 0 &&
                    <div>
                        <p>{this.state.solutions}</p>
                        <div> 
                    <Modal size="md" centered show={this.state.show}  onHide={() =>this.handleOpenModal()}>
                      <Modal.Header closeButton><Modal.Title>Edit a class</Modal.Title></Modal.Header>
                          <Modal.Body>
                            <form onSubmit={this.handleSubmit}>
                                <label>Grade the assignment:</label><br></br>
                                <input type="number" min={1} max={100} onChange={e => this.setState({grade: e.target.value})} value={this.state.grade}/>/100
                          </form>
                          </Modal.Body>
                          <Modal.Footer>
                            <a class="af" onClick={() =>this.editSolution(this.state.ModalData.id)} >
                              Save Changes
                            </a>
                          </Modal.Footer>
                       </Modal>
                     </div>
                    </div>}
                </div>}
            </div>
        </Sidebar>   
    );}
      
}
export default SolutionPage;