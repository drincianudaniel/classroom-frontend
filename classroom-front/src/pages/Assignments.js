import React from "react";
import axios from "axios";
import "../css/assignments.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import { faClipboardUser } from '@fortawesome/free-solid-svg-icons'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'

import { withRouter } from "react-router-dom";

class Assignments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          assignments: []
        };
      }

      componentDidMount(){
        this.getAssignmentData()
    } 
    
    deleteAssignment(id)
    {
        axios
        .delete(`http://localhost:3000/deleteassignment/${id}`,{ withCredentials: true })
        .then(res=>{
            this.getAssignmentData();
        })
        .catch((error) => {
            console.log(error)
      })
    }

    getAssignmentData() {
        axios
            .get(`http://localhost:3000/usersassignments/${this.props.match.params.id}`, { withCredentials: true })
            .then(res => {
                const data = res.data
                console.log(res.data)
                const assignments = data.map(u =>                  
                <div class="container">
                    <div class="card3">
                        <div class="card-body row">
                            <div class="col-1 "> 
                                <FontAwesomeIcon class="icon" icon={faClipboardUser} /> 
                            </div>
                            <Link class="col-xl-10 col-lg-10 col-md-10">
                                    <h5>X posted a new assignment: {u.name}</h5>
                                    {/* <h5>TIME</h5> */}
                            </Link>
                            <div class="col-1">
                            <FontAwesomeIcon class="icon2" icon={faEllipsisVertical} onClick={()=>this.deleteAssignment(u.id)}/> 
                            </div>
                        </div>
                    </div> 
                </div>
                ).reverse();
                    this.setState({
                        assignments
                    })
            })
            .catch((error) => {
              console.log(error)
        })
    }   

    render() {
        return(
            <div> 
                {this.state.assignments.length === 0 && <div class="noclass"> <img src={require('./noassignments.png')}></img><h6> No assignments could be found. </h6></div>}
                <div>
                    {this.state.assignments}
                </div>
            </div>
        )
    }
}
export default withRouter(Assignments);