import React from "react";
import axios from "axios";
import "../css/assignments.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import { faClipboardUser } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from "react-router-dom";

class Assignments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          assignments: []
        };
      }

      componentDidMount(){
        this.getUsersData()
    } 
    
    getUsersData() {
        axios
            .get(`http://localhost:3000/usersassignments/${this.props.match.params.id}`, { withCredentials: true })
            .then(res => {
                const data = res.data
                console.log(res.data)
                const assignments = data.map(u =>
                //   <div class="assignments">
                //   <p>{u.id}</p>
                //   <p>{u.name}</p>
                //   <p>{u.details}</p>
                //   </div>
                // <Link to={`/classpage/${u.id}`}>
                <Link>
                <div class="container">
                    <div class="card3">
                        <div class="card-body row">
                            <div class="assigclass2 col-lg-1"> 
                                <FontAwesomeIcon class="icon" icon={faClipboardUser} /> 
                            </div>
                            
                            <div class="texts col-lg-9">
                                <h4>{u.name}</h4>
                                <h5>{u.details}</h5>
                            </div>
                        </div>
                    </div> 
                </div>
                </Link>
                )
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