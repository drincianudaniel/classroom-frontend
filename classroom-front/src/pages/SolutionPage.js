import React, { Component, useEffect } from "react";
import axios from "axios";
import Sidebar from "react-sidebar";
import { Link } from "react-router-dom";

class SolutionPage extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
          solution: [],
          assignment: [],
          show: false,
          solutions: [],
          solution_content:"",
          username: ""
        };
        console.log(this.props)
      }

      componentDidMount(){
        this.getSolutionData()
        this.getAssignmentDetails()
        this.getAllSolutionData()
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

    getAllSolutionData(){
        axios
        .get(`http://localhost:3000/allsolutions/${this.props.match.params.assignment_id}`, { withCredentials: true })
        .then(res =>{
            const data = res.data
            const solutions = data.map(u =>
              <div>  
                  <p> {u.id} </p>
                  <p>{u.user.name} </p>
                  {u.solution_content}
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
       
        <div>
            {this.props.user.user_type === "Student" &&
            <div> 
                {this.state.assignment.name} <br></br>
                {this.state.assignment.details}
                {this.state.solution.length === 0 && 
                    <div>
                        <h1>Submit solution </h1>
                        <span class="textarea input" role="textbox" contenteditable="true" onInput={e => this.setState({solution_content: e.currentTarget.innerText})} value={this.state.solution_content}></span>
                        <button onClick={() =>this.createSolution()}>Submit solution</button>
                    </div>}
                {this.state.solution}
             </div>}
             {this.props.user.user_type === "Teacher" &&
            <div>
                {this.state.solutions}
            </div>}
        </div>
    );}
      
}
export default SolutionPage;