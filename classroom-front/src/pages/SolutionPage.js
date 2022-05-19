import React, { Component, Fragment, useEffect } from "react";
import axios from "axios";
import Sidebar from "react-sidebar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClipboardList } from '@fortawesome/free-solid-svg-icons'
import ClassSidebar from "./ClassSidebar.js";
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
          username: ""
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

    getAllSolutionData(){
        axios
        .get(`http://localhost:3000/allsolutions/${this.props.match.params.assignment_id}`, { withCredentials: true })
        .then(res =>{
            const data = res.data
            const solutions = data.map(u =>
              <div>  
                  {/* <p> {u.id} </p> */}
                  <p>{u.user.name} </p>
                  <p>{u.solution_content}</p>
                  {u.grade === null && 
                  <div>

                  </div>}
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
                        <div class="title">
                            <p>{this.state.assignment.name}</p>
                        </div>

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
                            <div class="title">
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
                    </div>}
                </div>}
            </div>
        </Sidebar>   
    );}
      
}
export default SolutionPage;