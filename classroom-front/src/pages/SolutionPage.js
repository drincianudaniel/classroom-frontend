import React, { Component, useEffect } from "react";
import axios from "axios";
import Sidebar from "react-sidebar";
import { Link } from "react-router-dom";

class SolutionPage extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
          solution: [],
          show: false,
          ModalData: "",
          details:""
        };
        console.log(this.props)
      }

      componentDidMount(){
        this.getSolutionData()
    }
    

    getSolutionData(){
        axios
        .get(`http://localhost:3000/usersolutions/${this.props.match.params.assignment_id}`, { withCredentials: true })
        .then(res =>{
            const data= res.data.solutions
            const solution = data.map(u =>
                <div>
                    <div>{u.id }</div>
                    <div>{u.solution_content} </div>
                 </div>
                    
            )
            this.setState({
                solution
            })
        })
    }



    render(){ 
     return(
       
        <div>
             {this.state.solution.length === 0 && <div>Submit solution</div>}
             {this.state.solution}
        </div>
    );}
      
    
}
export default SolutionPage;